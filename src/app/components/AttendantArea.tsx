import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  LogOut,
  Pencil,
  RefreshCcw,
  Save,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  formatMenuPrice,
  getMenuItemName,
  type MenuItem,
} from '../data/menuItems';
import { listProducts } from '../services/productService';
import {
  cancelAttendantOrder,
  completeAttendantOrder,
  listAttendantOrders,
  loginAttendant,
  updateAttendantOrder,
} from '../services/attendantService';
import type {
  AttendantLoginResult,
  AttendantOrder,
  AttendantOrderStatus,
} from '../types/attendant';
import ShinyText from './ShinyText';

const SESSION_KEY = 'auracup_attendant_session';
const STATUS_OPTIONS: AttendantOrderStatus[] = [
  'pendente',
  'confirmado',
  'preparando',
  'pronto',
  'entregue',
  'cancelado',
];

function loadStoredSession(): AttendantLoginResult | null {
  try {
    const storedSession = globalThis.localStorage?.getItem(SESSION_KEY);
    return storedSession
      ? (JSON.parse(storedSession) as AttendantLoginResult)
      : null;
  } catch {
    return null;
  }
}

function isActiveOrder(order: AttendantOrder) {
  return order.status !== 'entregue' && order.status !== 'cancelado';
}

function statusColor(status: AttendantOrderStatus) {
  const colorMap: Record<AttendantOrderStatus, string> = {
    pendente: 'bg-[#C9A84C] text-[#2C1A0E]',
    confirmado: 'bg-[#8A9E7B] text-[#10170D]',
    preparando: 'bg-[#5B3130] text-[#E3E3E3]',
    pronto: 'bg-[#2C1A0E] text-[#E3E3E3]',
    entregue: 'bg-[#E3E3E3] text-[#2C1A0E] border border-[#5B3130]/20',
    cancelado: 'bg-[#7A2E2E] text-[#E3E3E3]',
  };

  return colorMap[status];
}

export function AttendantArea() {
  const { t } = useLanguage();
  const [session, setSession] = useState<AttendantLoginResult | null>(() =>
    loadStoredSession()
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<AttendantOrder[]>([]);
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingOrderId, setSavingOrderId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [editTableNumber, setEditTableNumber] = useState('');
  const [editStatus, setEditStatus] =
    useState<AttendantOrderStatus>('pendente');
  const [editQuantities, setEditQuantities] = useState<Record<number, string>>(
    {}
  );

  const activeOrders = useMemo(() => orders.filter(isActiveOrder), [orders]);
  const completedOrders = useMemo(
    () => orders.filter(order => order.status === 'entregue'),
    [orders]
  );
  const canceledOrders = useMemo(
    () => orders.filter(order => order.status === 'cancelado'),
    [orders]
  );

  const loadOrders = useCallback(async () => {
    if (!session?.token) return;

    setLoading(true);
    setError('');

    try {
      setOrders(await listAttendantOrders(session.token));
    } catch {
      setError(t('attendant.errors.loadOrders'));
    } finally {
      setLoading(false);
    }
  }, [session?.token, t]);

  useEffect(() => {
    listProducts().then(result => setProducts(result.products));
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const nextSession = await loginAttendant(email, password);
      globalThis.localStorage?.setItem(
        SESSION_KEY,
        JSON.stringify(nextSession)
      );
      setSession(nextSession);
      setEmail('');
      setPassword('');
    } catch {
      setError(t('attendant.errors.login'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    globalThis.localStorage?.removeItem(SESSION_KEY);
    setSession(null);
    setOrders([]);
    setEditingOrderId(null);
  };

  const startEditing = (order: AttendantOrder) => {
    const quantities: Record<number, string> = {};
    products.forEach(product => {
      quantities[product.id] = '0';
    });
    order.products.forEach(product => {
      quantities[product.id] = String(product.quantity);
    });

    setEditingOrderId(order.id);
    setEditTableNumber(String(order.tableNumber));
    setEditStatus(order.status);
    setEditQuantities(quantities);
    setError('');
  };

  const handleSaveEdit = async (orderId: number) => {
    if (!session?.token) return;

    const items = Object.entries(editQuantities)
      .map(([productId, quantity]) => ({
        productId: Number(productId),
        quantity: Number(quantity),
      }))
      .filter(item => Number.isInteger(item.productId) && item.quantity > 0);

    if (items.length === 0) {
      setError(t('attendant.errors.emptyItems'));
      return;
    }

    setSavingOrderId(orderId);
    setError('');

    try {
      await updateAttendantOrder(session.token, orderId, {
        tableNumber: Number(editTableNumber),
        status: editStatus,
        items,
      });
      setEditingOrderId(null);
      await loadOrders();
    } catch {
      setError(t('attendant.errors.save'));
    } finally {
      setSavingOrderId(null);
    }
  };

  const runOrderAction = async (
    orderId: number,
    action: (token: string, orderId: number) => Promise<AttendantOrder>
  ) => {
    if (!session?.token) return;

    setSavingOrderId(orderId);
    setError('');

    try {
      await action(session.token, orderId);
      await loadOrders();
    } catch {
      setError(t('attendant.errors.action'));
    } finally {
      setSavingOrderId(null);
    }
  };

  return (
    <section className="min-h-screen bg-[#E3E3E3] px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#5B3130] px-4 py-2 font-['Inter'] text-sm font-bold text-[#E3E3E3]">
              <ShieldCheck className="h-4 w-4" />
              {t('attendant.badge')}
            </div>
            <div className="max-w-full overflow-visible">
              <ShinyText
                text={t('attendant.title')}
                speed={3}
                delay={0}
                color="#2C1A0E"
                shineColor="#E3E3E3"
                spread={100}
                direction="left"
                yoyo
                pauseOnHover
                disabled={false}
                className="font-['Inter'] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-normal break-words"
              />
            </div>
          </div>

          {session && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={loadOrders}
                className="inline-flex items-center gap-2 rounded-full bg-[#E3E3E3] px-5 py-3 font-['Inter'] text-sm font-bold text-[#5B3130] transition-all duration-300 hover:bg-[#3d2918] hover:scale-105 active:scale-95"
              >
                <RefreshCcw className="h-4 w-4" />
                {t('attendant.refresh')}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-[#5B3130]/30 px-5 py-3 font-['Inter'] text-sm font-bold text-[#5B3130] transition-all duration-300 hover:bg-[#5B3130]/10 hover:scale-105 active:scale-95"
              >
                <LogOut className="h-4 w-4" />
                {t('attendant.logout')}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-[#7A2E2E]/30 bg-[#7A2E2E]/10 px-4 py-3 font-['Inter'] text-sm font-semibold text-[#7A2E2E]">
            {error}
          </div>
        )}

        {!session ? (
          <form
            onSubmit={handleLogin}
            className="max-w-xl rounded-2xl bg-[#F9F9F9] border border-[#5B3130] p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center gap-3 text-[#141517]">
              <ShieldCheck className="h-5 w-5" />
              <h2 className="font-['Inter'] text-1xl font-medium">
                {t('attendant.loginTitle')}
              </h2>
            </div>
            <div className="grid gap-4">
              <label className="font-['Inter'] text-sm font-bold text-[#141517]">
                {t('attendant.email')}
                <input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="atendente@auracup.com"
                  className="mt-2 w-full rounded-lg border border-[#5B3130]/20 bg-[#E3E3E3] px-4 py-3 font-normal text-[#141517] outline-none focus:border-[#5B3130] focus:ring-1 focus:ring-[#5B3130]"
                  required
                />
              </label>
              <label className="font-['Inter'] text-sm font-bold text-[#141517]">
                {t('attendant.password')}
                <input
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="********"
                  className="mt-2 w-full rounded-lg border border-[#5B3130]/20 bg-[#E3E3E3] px-4 py-3 font-normal text-[#141517] outline-none focus:border-[#5B3130] focus:ring-1 focus:ring-[#5B3130]"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5B3130] px-5 py-3 font-['Inter'] text-sm font-bold text-[#E3E3E3] transition-all duration-300 hover:bg-[#C9A84C] hover:scale-105 active:scale-95"
              >
                <ShieldCheck className="h-4 w-4" />
                {loading ? t('attendant.loading') : t('attendant.login')}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid gap-8">
            <DashboardSummary
              activeCount={activeOrders.length}
              completedCount={completedOrders.length}
              canceledCount={canceledOrders.length}
            />
            <OrderGroup
              title={t('attendant.activeOrders')}
              icon={<Clock className="h-5 w-5" />}
              orders={activeOrders}
              products={products}
              editingOrderId={editingOrderId}
              editTableNumber={editTableNumber}
              editStatus={editStatus}
              editQuantities={editQuantities}
              savingOrderId={savingOrderId}
              onEditTableNumber={setEditTableNumber}
              onEditStatus={setEditStatus}
              onEditQuantity={(productId, quantity) =>
                setEditQuantities(current => ({
                  ...current,
                  [productId]: quantity,
                }))
              }
              onStartEditing={startEditing}
              onCancelEditing={() => setEditingOrderId(null)}
              onSaveEdit={handleSaveEdit}
              onComplete={orderId =>
                runOrderAction(orderId, completeAttendantOrder)
              }
              onCancel={orderId =>
                runOrderAction(orderId, cancelAttendantOrder)
              }
            />
            <OrderGroup
              title={t('attendant.completedOrders')}
              icon={<CheckCircle2 className="h-5 w-5" />}
              orders={completedOrders}
              products={products}
              editingOrderId={editingOrderId}
              editTableNumber={editTableNumber}
              editStatus={editStatus}
              editQuantities={editQuantities}
              savingOrderId={savingOrderId}
              onEditTableNumber={setEditTableNumber}
              onEditStatus={setEditStatus}
              onEditQuantity={(productId, quantity) =>
                setEditQuantities(current => ({
                  ...current,
                  [productId]: quantity,
                }))
              }
              onStartEditing={startEditing}
              onCancelEditing={() => setEditingOrderId(null)}
              onSaveEdit={handleSaveEdit}
              onComplete={orderId =>
                runOrderAction(orderId, completeAttendantOrder)
              }
              onCancel={orderId =>
                runOrderAction(orderId, cancelAttendantOrder)
              }
            />
            {canceledOrders.length > 0 && (
              <OrderGroup
                title={t('attendant.canceledOrders')}
                icon={<XCircle className="h-5 w-5" />}
                orders={canceledOrders}
                products={products}
                editingOrderId={editingOrderId}
                editTableNumber={editTableNumber}
                editStatus={editStatus}
                editQuantities={editQuantities}
                savingOrderId={savingOrderId}
                onEditTableNumber={setEditTableNumber}
                onEditStatus={setEditStatus}
                onEditQuantity={(productId, quantity) =>
                  setEditQuantities(current => ({
                    ...current,
                    [productId]: quantity,
                  }))
                }
                onStartEditing={startEditing}
                onCancelEditing={() => setEditingOrderId(null)}
                onSaveEdit={handleSaveEdit}
                onComplete={orderId =>
                  runOrderAction(orderId, completeAttendantOrder)
                }
                onCancel={orderId =>
                  runOrderAction(orderId, cancelAttendantOrder)
                }
              />
            )}
            {loading && (
              <div className="rounded-lg bg-[#F5ECD7] p-5 font-['Inter'] text-[#2C1A0E] shadow-lg">
                {t('attendant.loading')}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function DashboardSummary({
  activeCount,
  completedCount,
  canceledCount,
}: Readonly<{
  activeCount: number;
  completedCount: number;
  canceledCount: number;
}>) {
  const { t } = useLanguage();
  const items = [
    { label: t('attendant.activeOrders'), value: activeCount, icon: Clock },
    {
      label: t('attendant.completedOrders'),
      value: completedCount,
      icon: CheckCircle2,
    },
    {
      label: t('attendant.canceledOrders'),
      value: canceledCount,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map(item => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl bg-[#F5ECD7] p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#5B3130] text-[#E3E3E3]">
              <Icon className="h-5 w-5" />
            </div>
            <p className="font-['Inter'] text-sm font-bold uppercase text-[#5B3130]">
              {item.label}
            </p>
            <strong className="font-['Inter'] text-4xl text-[#2C1A0E]">
              {item.value}
            </strong>
          </div>
        );
      })}
    </div>
  );
}

function OrderGroup({
  title,
  icon,
  orders,
  products,
  editingOrderId,
  editTableNumber,
  editStatus,
  editQuantities,
  savingOrderId,
  onEditTableNumber,
  onEditStatus,
  onEditQuantity,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  onComplete,
  onCancel,
}: Readonly<{
  title: string;
  icon: ReactNode;
  orders: AttendantOrder[];
  products: MenuItem[];
  editingOrderId: number | null;
  editTableNumber: string;
  editStatus: AttendantOrderStatus;
  editQuantities: Record<number, string>;
  savingOrderId: number | null;
  onEditTableNumber: (value: string) => void;
  onEditStatus: (value: AttendantOrderStatus) => void;
  onEditQuantity: (productId: number, quantity: string) => void;
  onStartEditing: (order: AttendantOrder) => void;
  onCancelEditing: () => void;
  onSaveEdit: (orderId: number) => void;
  onComplete: (orderId: number) => void;
  onCancel: (orderId: number) => void;
}>) {
  const { t, lang } = useLanguage();

  return (
    <section>
      <div className="mb-4 flex items-center gap-2 font-['Inter'] text-[#5B3130]">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-[#5B3130]/15 bg-[#F5ECD7] p-5 font-['Inter'] text-[#2C1A0E]/70">
          {t('attendant.emptyOrders')}
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => {
            const isEditing = editingOrderId === order.id;
            const isSaving = savingOrderId === order.id;

            return (
              <article
                key={order.id}
                className="rounded-2xl bg-[#F5ECD7] p-5 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#2C1A0E] px-3 py-1 font-['Inter'] text-sm font-bold text-[#E3E3E3]">
                        <ClipboardList className="h-4 w-4" />#{order.id}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 font-['Inter'] text-xs font-bold uppercase ${statusColor(order.status)}`}
                      >
                        {t(`attendant.status.${order.status}`)}
                      </span>
                    </div>
                    <p className="font-['Inter'] text-lg font-bold text-[#2C1A0E]">
                      {t('attendant.table')} {order.tableNumber}
                    </p>
                    <p className="font-['Inter'] text-sm text-[#2C1A0E]/65">
                      {new Intl.DateTimeFormat(
                        lang === 'pt-br' ? 'pt-BR' : 'en-US',
                        {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        }
                      ).format(new Date(order.createdAt))}
                    </p>
                  </div>

                  <strong className="font-['Inter'] text-2xl text-[#5B3130]">
                    {formatMenuPrice(order.totalPrice, lang)}
                  </strong>
                </div>

                <div className="mt-4 grid gap-2">
                  {order.products.map(product => (
                    <div
                      key={product.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/70 px-3 py-2 font-['Inter'] text-sm text-[#2C1A0E]"
                    >
                      <span>
                        {lang === 'pt-br' ? product.namePt : product.nameEn}
                      </span>
                      <span className="font-bold">
                        {product.quantity} x{' '}
                        {formatMenuPrice(product.unitPrice, lang)}
                      </span>
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <div className="mt-5 grid gap-4 rounded-xl border border-[#5B3130]/20 bg-white/60 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="font-['Inter'] text-sm font-bold text-[#2C1A0E]">
                        {t('attendant.table')}
                        <input
                          type="number"
                          min="1"
                          value={editTableNumber}
                          onChange={event =>
                            onEditTableNumber(event.target.value)
                          }
                          className="mt-2 w-full rounded-lg border border-[#5B3130]/20 bg-white px-3 py-2 font-normal text-[#2C1A0E] outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]"
                        />
                      </label>
                      <label className="font-['Inter'] text-sm font-bold text-[#2C1A0E]">
                        {t('attendant.status')}
                        <select
                          value={editStatus}
                          onChange={event =>
                            onEditStatus(
                              event.target.value as AttendantOrderStatus
                            )
                          }
                          className="mt-2 w-full rounded-lg border border-[#5B3130]/20 bg-white px-3 py-2 font-normal text-[#2C1A0E] outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]"
                        >
                          {STATUS_OPTIONS.map(status => (
                            <option key={status} value={status}>
                              {t(`attendant.status.${status}`)}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {products.map(product => (
                        <label
                          key={product.id}
                          className="rounded-xl border border-[#5B3130]/15 bg-[#F5ECD7] p-3 font-['Inter'] text-sm font-bold text-[#2C1A0E]"
                        >
                          {getMenuItemName(product, lang)}
                          <input
                            type="number"
                            min="0"
                            value={editQuantities[product.id] ?? '0'}
                            onChange={event =>
                              onEditQuantity(product.id, event.target.value)
                            }
                            className="mt-2 w-full rounded-lg border border-[#5B3130]/20 bg-white px-3 py-2 font-normal text-[#2C1A0E] outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]"
                          />
                        </label>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => onSaveEdit(order.id)}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 rounded-full bg-[#5B3130] px-5 py-3 font-['Inter'] text-sm font-bold text-[#E3E3E3] transition-all duration-300 hover:bg-[#3d2918] hover:scale-105 active:scale-95 disabled:opacity-60"
                      >
                        <Save className="h-4 w-4" />
                        {t('attendant.save')}
                      </button>
                      <button
                        type="button"
                        onClick={onCancelEditing}
                        className="inline-flex items-center gap-2 rounded-full border border-[#5B3130]/30 px-5 py-3 font-['Inter'] text-sm font-bold text-[#5B3130] transition-all duration-300 hover:bg-[#5B3130]/10 hover:scale-105 active:scale-95"
                      >
                        <XCircle className="h-4 w-4" />
                        {t('attendant.cancelEdit')}
                      </button>
                    </div>
                  </div>
                )}

                {!isEditing && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onStartEditing(order)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#5B3130]/30 px-4 py-2 font-['Inter'] text-sm font-bold text-[#5B3130] transition-all duration-300 hover:bg-[#5B3130]/10 hover:scale-105 active:scale-95"
                    >
                      <Pencil className="h-4 w-4" />
                      {t('attendant.edit')}
                    </button>
                    {order.status !== 'entregue' && (
                      <button
                        type="button"
                        onClick={() => onComplete(order.id)}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 rounded-full bg-[#8A9E7B] px-4 py-2 font-['Inter'] text-sm font-bold text-[#10170D] transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95 disabled:opacity-60"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {t('attendant.complete')}
                      </button>
                    )}
                    {order.status !== 'cancelado' && (
                      <button
                        type="button"
                        onClick={() => onCancel(order.id)}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 rounded-full bg-[#7A2E2E] px-4 py-2 font-['Inter'] text-sm font-bold text-[#E3E3E3] transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95 disabled:opacity-60"
                      >
                        <XCircle className="h-4 w-4" />
                        {t('attendant.cancelOrder')}
                      </button>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

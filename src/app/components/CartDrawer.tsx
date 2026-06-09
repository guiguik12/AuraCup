import { FormEvent, useMemo, useState } from 'react';
import {
  CheckCircle2,
  ClipboardList,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { formatMenuPrice, getMenuItemName } from '../data/menuItems';
import { validateOrderDraft } from '../domain/orderRules';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const {
    lines,
    cartItemCount,
    cartTotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    submitOrder,
  } = useCart();
  const { t, lang } = useLanguage();
  const [tableNumber, setTableNumber] = useState('');
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalLabel = useMemo(
    () => formatMenuPrice(cartTotal, lang),
    [cartTotal, lang]
  );

  if (!isCartOpen) return null;

  const hasItems = lines.length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const parsedTableNumber = Number(tableNumber);
    const validationKey = validateOrderDraft(lines, parsedTableNumber);

    if (validationKey) {
      setSubmitError(t(validationKey));
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitOrder(parsedTableNumber);
      setLastOrderId(result.order.id);
      setTableNumber('');
    } catch {
      setSubmitError(t('cart.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-[#141517]/50" onClick={closeCart} />

      <aside
        aria-label={t('cart.title')}
        className="relative flex h-full w-full max-w-[460px] flex-col overflow-y-auto bg-[#E3E3E3] p-5 shadow-2xl md:p-6"
        style={{ overscrollBehavior: 'contain' }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#5B3130]/15 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5B3130] text-[#E3E3E3]">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <div className="flex items-baseline gap-2">
              <h2 className="font-['Inter'] text-1xl font-bold text-[#141517]">
                {t('cart.title')}
              </h2>
              <p className="font-['Inter'] text-sm text-[#141517]/65">
                ({cartItemCount} {t('cart.items')})
              </p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#141517] transition-colors hover:bg-[#5B3130]/10"
            onClick={closeCart}
            aria-label={t('cart.close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {lastOrderId && !hasItems && (
          <div className="mt-5 rounded-lg border border-[#5B3130]/40 bg-[#5B3130]/15 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 text-[#141517]" />
              <div>
                <p className="font-['Inter'] text-base font-bold text-[#141517]">
                  {t('cart.orderSuccess')}
                </p>
                <p className="font-['Inter'] text-sm text-[#141517]/70">
                  {t('cart.orderNumber')} {lastOrderId}
                </p>
                <p className="mt-1 font-['Inter'] text-sm text-[#141517]/70">
                  {t('cart.sentToApi')}
                </p>
              </div>
            </div>
          </div>
        )}

        {!hasItems ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <ClipboardList className="h-12 w-12 text-[#5B3130]" />
            <div>
              <p className="font-['Inter'] text-xl font-bold text-[#141517]">
                {t('cart.emptyTitle')}
              </p>
              <p className="mt-2 font-['Inter'] text-sm text-[#141517]/65">
                {t('cart.emptyText')}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-5 space-y-3">
              {lines.map(line => {
                const itemName = getMenuItemName(line.item, lang);

                return (
                  <article
                    key={line.item.id}
                    className="grid grid-cols-[76px_1fr] gap-3 rounded-lg bg-[#5B3130] p-3 shadow-sm"
                  >
                    <img
                      src={line.item.image}
                      alt={itemName}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-['Inter'] text-base font-bold text-[#E3E3E3]">
                            {itemName}
                          </h3>
                        </div>
                        <button
                          type="button"
                          className="rounded-full p-2 text-[#E3E3E3] transition-colors hover:bg-[#E3E3E3]/10"
                          onClick={() => removeItem(line.item.id)}
                          aria-label={`${t('cart.remove')} ${itemName}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center rounded-full border border-[#5B3130]/20 bg-[#E3E3E3]">
                          <button
                            type="button"
                            className="flex h-6 w-6 items-center justify-center text-[#141517]"
                            onClick={() =>
                              updateQuantity(line.item.id, line.quantity - 1)
                            }
                            aria-label={`${t('cart.decrease')} ${itemName}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-8 text-center font-['Inter'] text-sm text-[#141517]">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            className="flex h-6 w-6 items-center justify-center text-[#141517]"
                            onClick={() =>
                              updateQuantity(line.item.id, line.quantity + 1)
                            }
                            aria-label={`${t('cart.increase')} ${itemName}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-['Inter'] text-sm text-[#E3E3E3]">
                          {formatMenuPrice(
                            line.item.price * line.quantity,
                            lang
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 rounded-lg bg-[#f9f9f9] p-4 text-[#141517] border border-[#141517]/50">
              <div className="flex items-center justify-between font-['Inter'] text-lg font-bold">
                <span>{t('cart.total')}</span>
                <span>{totalLabel}</span>
              </div>
              <button
                type="button"
                className="mt-3 text-sm text-[#141517]/75 underline transition-colors hover:text-[#141517]"
                onClick={clearCart}
              >
                {t('cart.clear')}
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <h3 className="font-['Inter'] text-lg font-bold text-[#141517]">
                {t('cart.checkout')}
              </h3>

              <label className="block font-['Inter'] text-sm text-[#141517]">
                {t('cart.tableNumber')}
                <input
                  required
                  min={1}
                  type="number"
                  value={tableNumber}
                  onChange={event => setTableNumber(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#5B3130]/20 bg-[#f9f9f9] px-3 py-2 font-['Inter'] text-sm text-[#141517] outline-none focus:border-[#5B3130] focus:ring-1 focus:ring-[#5B3130]"
                />
              </label>

              {submitError && (
                <p className="rounded-lg border border-red-200 bg-red-50 p-3 font-['Inter'] text-sm text-red-700">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-full bg-[#5B3130] px-3 py-2 font-['Inter'] text-base font-bold text-[#E3E3E3] transition-all duration-300 hover:bg-[#c9a84c] hover:scale-105 active:scale-95 disabled:opacity-60"
              >
                {isSubmitting ? t('cart.submitting') : t('cart.submit')}
              </button>
            </form>
          </>
        )}
      </aside>
    </div>
  );
}

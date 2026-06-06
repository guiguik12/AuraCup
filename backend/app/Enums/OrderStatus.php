<?php

namespace App\Enums;

enum OrderStatus: string
{
    case PENDING = 'pendente';
    case CONFIRMED = 'confirmado';
    case PREPARING = 'preparando';
    case READY = 'pronto';
    case DELIVERED = 'entregue';
    case CANCELED = 'cancelado';
}
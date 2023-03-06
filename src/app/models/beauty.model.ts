export interface Beauty {
  id: number;
  creationDate: Date;
  productName?: string;
  productPrice?: number;
  status: BeautyStatus;
  beautySum: number;
}

export type BeautyStatus = 'NEW' | 'RECEIVED_INF' | 'APPROVED' | 'REJECTED' | 'RECEIVED_SUM';

export interface BeautyForClient extends Beauty{
  shopName: string;
}

export interface BeautyForShop extends Beauty{
  isPaid: boolean;
  isOrderCompleted: boolean;
  confirmPayment: boolean;
  clientLastName: string;
  clientFirstName: string;
  shopPayment: string;
}

export interface BeautyChangeRequestPayload {
  beautyId: number;
  isPaid: boolean;
  isOrderCompleted: boolean;
  payment: boolean;
}

export interface BeautyForAdmin extends BeautyForShop{
  shopName: string;
}

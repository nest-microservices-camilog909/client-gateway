import {
	IsBoolean,
	IsEnum,
	IsNumber,
	IsOptional,
	IsPositive,
} from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class CreateOrderDto {
	@IsNumber()
	@IsPositive()
	public totalAmount: number;
	@IsNumber()
	@IsPositive()
	public totalItems: number;
	@IsEnum(OrderStatusList, {
		message: 'Invalid status',
	})
	@IsOptional()
	public status: OrderStatus = OrderStatus.PENDING;
	@IsBoolean()
	@IsOptional()
	public paid: boolean = false;
}

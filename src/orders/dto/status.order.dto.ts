import { IsEnum } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class StatusOrderDto {
	@IsEnum(OrderStatusList, {
		message: 'Invalid status',
	})
	public status: OrderStatus;
}

import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { services } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
	constructor(
		@Inject(services.PRODUCTS_SERVICE)
		private readonly productsClient: ClientProxy,
	) {}

	@Get()
	findAllProducts(@Query() request: PaginationDto) {
		return this.productsClient.send({ cmd: 'find_all' }, request);
	}

	@Get(':id')
	async findProduct(@Param('id', ParseIntPipe) id: number) {
		try {
			const product = await firstValueFrom(
				this.productsClient.send({ cmd: 'find_one' }, { id }),
			);

			return product;
		} catch (error) {
			throw new RpcException(error);
		}

		// THROW ERROR WITH PIPE (OPTION B)
		// return this.productsClient.send({ cmd: 'find_one' }, { id }).pipe(
		// 	catchError((err) => {
		// 		throw new RpcException(err);
		// 	}),
		// );
	}

	@Post()
	async createProduct(@Body() request: CreateProductDto) {
		try {
			return await firstValueFrom(
				this.productsClient.send({ cmd: 'create' }, request),
			);
		} catch (e) {
			throw new RpcException(e);
		}
	}

	@Patch(':id')
	async updateProduct(
		@Param('id', ParseIntPipe) id: number,
		@Body() request: UpdateProductDto,
	) {
		try {
			return await firstValueFrom(
				this.productsClient.send({ cmd: 'update' }, { ...request, id }),
			);
		} catch (e) {
			throw new RpcException(e);
		}
	}

	@Delete(':id')
	async deleteProduct(@Param('id', ParseIntPipe) id: number) {
		try {
			return await firstValueFrom(
				this.productsClient.send({ cmd: 'delete' }, { id }),
			);
		} catch (e) {
			throw new RpcException(e);
		}
	}
}

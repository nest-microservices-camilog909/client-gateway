import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
	constructor() {}

	@Get()
	findAllProducts() {
		return 'Todos los productos';
	}

	@Get(':id')
	findProduct(@Param('id', ParseIntPipe) id: number) {
		return 'Producto #' + id;
	}

	@Post()
	createProduct(@Body() request: any) {
		return 'Crear producto';
	}

	@Patch(':id')
	updateProduct(@Param('id', ParseIntPipe) id: number, @Body() request: any) {
		return 'Actualizar producto #' + id;
	}

	@Delete(':id')
	deleteProduct(@Param('id', ParseIntPipe) id: number) {
		return 'Eliminar producto #' + id;
	}
}

package org.resource;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.controller.ProdutoController;
import org.entity.Produto;

@ApplicationScoped
@Path("/produto")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProdutoResource {

	@Inject
	private ProdutoController productService;

	@POST
	@Produces("application/json")
	public Response addProduct(Produto product) {
		productService.addProduct(product);
		return Response.ok().build();
	}

	@GET
	@Produces("application/json")
	public Response getProduct() {
		List<Produto> prod = productService.getProduct();
		return Response.ok(prod).build();
	}

	@POST
	@Path("/delete")
	@Produces("application/json")
	public Response deleteProduct(Long id) {
		Long num = productService.delete(id);
		return Response.ok(num).build();
	}
}
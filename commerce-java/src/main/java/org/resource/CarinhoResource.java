package org.resource;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.controller.CarrinhoController;
import org.dto.CarrinhoDTO;
import org.entity.Carrinho;

@ApplicationScoped
@Path("/carrinho")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CarinhoResource {
    @Inject
    private CarrinhoController carrinhoController;

    @POST
    @Produces("application/json")
    public Response addCar(Carrinho product) {
        carrinhoController.addCar(product);
        return Response.ok().build();
    }

    @POST
    @Path("/buscar")
    @Produces("application/json")
    public Response getCar(String idUser) {
        List<CarrinhoDTO> prod = carrinhoController.getCarrinho(idUser);
        return Response.ok(prod).build();
    }

    @POST
    @Path("/delete")
    @Produces("application/json")
    public Response deleteCar(Long id) {
        carrinhoController.delete(id);
        return Response.ok().build();
    }
    
    @GET
    @Path("/editar/{id}/{status}")
    @Produces("application/json")
    public Response editarCar(@PathParam("id") Long id, @PathParam("status") String status) {
        carrinhoController.editar(id,status);
        return Response.ok().build();
    }
}

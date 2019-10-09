package org.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

import org.dto.CarrinhoDTO;
import org.entity.Carrinho;
import org.entity.Produto;
import org.repository.CarrrinhoRepository;

@ApplicationScoped
public class CarrinhoController {

	@Inject
	private CarrrinhoRepository carrinhoRepository;

	@Inject
	private ProdutoController produtoController;

	public List<CarrinhoDTO> getCarrinho(String idUser) {
		List<Carrinho> list = new ArrayList<>();
		List<CarrinhoDTO> listDto = new ArrayList<>();
		if (idUser != null && idUser != "") {
			Map<String, Object> params = new HashMap<>();
			params.put("idUser", idUser);
			String hql = "FROM Carrinho C WHERE C.idUser = :idUser";
			list = Carrinho.list(hql, params);
		} else {
			list = Carrinho.listAll();
		}

		for (Carrinho c : list) {
			Produto p = produtoController.getProductById(c.getIdProduto());
			CarrinhoDTO dto = new CarrinhoDTO();
			dto.setIdCarrinho(c.getId());
			dto.setNomeProduto(p.getNome());
			dto.setValorProduto(p.getValor());
			dto.setStatusProduto(c.getStatus());
			dto.setEmailUser(c.getEmail());
			listDto.add(dto);
		}

		return listDto;
	}

	public Long countCarByProduct(Long idProduto) {
		Map<String, Object> params = new HashMap<>();
		params.put("idProduto", idProduto);
		String hql = "FROM Carrinho C WHERE C.idProduto = :idProduto";
		return carrinhoRepository.count(hql, params);
	}

	@Transactional
	public void addCar(Carrinho carrinho) {
		carrinhoRepository.persist(carrinho);
	}

	@Transactional
	public void delete(Long id) {
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		String hql = "FROM Carrinho C WHERE C.id = :id";
		carrinhoRepository.delete(hql, params);
	}
	
	@Transactional
	public void editar(Long id, String status) {
		Carrinho car = Carrinho.findById(id);
		car.setStatus(status);
		carrinhoRepository.persist(car);
	}

}

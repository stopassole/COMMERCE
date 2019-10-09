package org.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

import org.entity.Produto;
import org.repository.ProdutoRepository;

@ApplicationScoped
public class ProdutoController {

	@Inject
	private ProdutoRepository productRepository;
	@Inject
	private CarrinhoController carrinhoController;

	public List<Produto> getProduct() {
		return Produto.listAll();
	}

	@Transactional
	public void addProduct(Produto product) {
		productRepository.persist(product);
	}

	@Transactional
	public Long delete(Long id) {
		Long cont = carrinhoController.countCarByProduct(id);
		if (cont == null || cont == 0) {
			Map<String, Object> params = new HashMap<>();
			params.put("id", id);
			String hql = "FROM Produto P WHERE P.id = :id";
			productRepository.delete(hql, params);
			return 0L;
		} else {
			return 1L;
		}
	}

	public Produto getProductById(Long id) {
		return Produto.findById(id);
	}
}

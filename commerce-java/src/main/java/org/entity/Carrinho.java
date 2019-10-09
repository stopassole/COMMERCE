package org.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
public class Carrinho extends PanacheEntityBase {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	@Column(name = "idUser")
	public String idUser;
	@Column(name = "email")
	public String email;
	@Column(name = "idProduto")
	public Long idProduto;
	@Column(name = "status")
	public String status;

	public Carrinho() {
	}

	public Carrinho(Long id, String idUser, String email, Long idProduto, String status) {
		super();
		this.id = id;
		this.idUser = idUser;
		this.email = email;
		this.idProduto = idProduto;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIdUser() {
		return idUser;
	}

	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getIdProduto() {
		return idProduto;
	}

	public void setIdProduto(Long idProduto) {
		this.idProduto = idProduto;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}

//create table carrinho (
//id serial not null,
//idUser varchar(100) not null,
//email varchar(100) not null,
//idProduto numeric not null,
//status varchar(100) not null,
//CONSTRAINT carrinho_pkey PRIMARY KEY (id))
import Axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import '../style/login.css'

const Admin = () => {
	const [products, setProduct] = useState([]);
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [date, setDate] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIslogin] = useState(true);
	const [formValid, setFormValid] = useState(false);
	const [times, setTimes] = useState(0);
	const url = "http://localhost:3000";

	const getProductStatus = (price) => {
		return price < 0 ? "expense" : "income";
	};

	useEffect(() => {
		Axios.get(`${url}/products`).then((res) => {
			setProduct(res.data.reverse());
		});
		if (localStorage.getItem("login") === "noarmiller") {
			setIslogin(false);
		}
	}, []);

	const getProducts = async () => {
		Axios.get(`${url}/products`).then((res) => {
			setProduct(res.data.reverse());
		});
	};

	const addProducts = (e) => {
		e.preventDefault();
		if (times > 0) {
			const priceTimes = price * times
			Axios.post(`${url}/add`, { title, price: priceTimes, date })
				.then((res) => {
					console.log(res);
					getProducts();
					Swal.fire({
						icon: "success",
						title: "success",
					});
					const inputs = document.querySelectorAll("input");
					for (const input of inputs) {
						input.value = "";
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			Axios.post(`${url}/add`, { title, price, date })
				.then((res) => {
					console.log(res);
					getProducts();
					Swal.fire({
						icon: "success",
						title: "success",
					});
					const inputs = document.querySelectorAll("input");
					for (const input of inputs) {
						input.value = "";
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}

	};

	useEffect(() => {
		const check =
			title.trim().length > 0 && price != 0 && date.trim().length > 0;
		if (check) {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}, [title, price, date]);

	const deleteProducts = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				Axios.delete(`${url}/delete/${id}`).then((res) => {
					console.log("deleted");
					Axios.get(`${url}/products`).then((res) => {
						setProduct(res.data.reverse());
					});
				});
				Swal.fire("Deleted!", "Your file has been deleted.", "success");
			}
		});
	};
	const login = (e) => {
		e.preventDefault();
		Axios.post(`${url}/login`, { username, password }).then((res) => {
			if (res.data.status === "ok") {
				setIslogin(false);
			} else {
				setIslogin(true);
			}
		});
	};



	return (
		<>
			<Navbar />
			{!isLogin ? (
				<>
					<div className="container mt-5">
						<form action="">
							<label htmlFor="title" className="form-label mb-2">
								ชื่อรายการ
							</label>
							<input
								type="text"
								className="form-control mb-2"
								placeholder="อะไรก็ได้..."
								id="myInput"
								onChange={(event) => {
									setTitle(event.target.value);
								}}
							/>
							<label htmlFor="price" className="form-label mb-2">
								จำนวน
							</label>
							<div className="row">
								<input
									type="number"
									className="form-control mb-2 me-5 ms-2 col"
									placeholder="1500..."
									id="myInput"

									onChange={(event) => {
										setPrice(event.target.value);
									}}
								/>
								<input
									type="number"
									className="form-control mb-2 me-2 col"
									placeholder="10..."
									id="myInput"
									onChange={(event) => {
										setTimes(event.target.value);
									}}
								/>
							</div>
							<label htmlFor="date" className="form-label mb-2">
								วันที่
							</label>
							<input
								type="date"
								className="form-control mb-2"
								id="myInput"
								onChange={(event) => {
									setDate(event.target.value);
								}}
							/>
							<button
								className="btn btn-success container-fluid"
								disabled={!formValid}
								onClick={addProducts}
							>
								เพิ่ม
							</button>
						</form>
						<br />
						<br />
						<div className="showProducts">
							<table className="table">
								<thead>
									<tr>
										<th scope="col">ชื่อรายการ</th>
										<th scope="col">ราคา</th>
										<th scope="col">วันที่</th>
										<th scope="col">ลบ</th>
									</tr>
								</thead>
								{products.map((val, key) => {
									return (
										<tbody key={key}>
											<tr>
												<td>{val.title}</td>
												<td>
													{val.price.toLocaleString(
														"en-US"
													)}{" "}
													₭
												</td>
												<td>{val.date}</td>
												<td
													id={getProductStatus(
														val.price
													)}
												>
													<button
														className="btn btn-danger"
														onClick={() => {
															deleteProducts(
																val.id
															);
														}}
													>
														ลบ
													</button>
												</td>
											</tr>
										</tbody>
									);
								})}
							</table>
						</div>
					</div>
				</>
			) : (
				<>
					<main className="form-signin w-100 m-auto">
						<form>
							<h1 className="h3 mb-3 fw-normal">
								Please sign in
							</h1>

							<div className="form-floating">
								<input
									onChange={(e) => {
										setUsername(e.target.value);
									}}
									type="text"
									className="form-control"
									id="floatingInput"
									placeholder="name@example.com"
								/>
								<label htmlFor="floatingInput">Email address</label>
							</div>
							<div className="form-floating">
								<input
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									type="password"
									className="form-control"
									id="floatingPassword"
									placeholder="Password"
								/>
								<label htmlFor="floatingPassword">Password</label>
							</div>
							<button
								className="btn btn-primary w-100 py-2"
								type="submit"
								onClick={login}
							>
								Sign in
							</button>
						</form>
					</main>
				</>
			)}
		</>
	);
};

export default Admin;

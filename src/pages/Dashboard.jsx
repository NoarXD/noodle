import { useState, useEffect } from "react";
import Axios from "axios";
import Navber from "../component/Navbar";
import "../style/priceStatus.css";

function App() {
    const [products, setProduct] = useState([]);
    const url = "https://odd-cyan-monkey-wrap.cyclic.cloud/";

    const getProducts = async () => {
        try {
            const response = await Axios.get(`${url}/products`);
            setProduct(response.data.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const getProductStatus = (price) => {
        return price < 0 ? "expense" : "income";
    };

    return (
        <>
            <Navber />
            <div className="container mt-5">
                <div className="showPrice mb-5">
                    <h3>
                        เงินทังหมด:{" "}
                        {products
                            .reduce((val, item) => {
                                return val + item.price;
                            }, 0)
                            .toLocaleString("en-US")} ₭
                    </h3>
                </div>
                <div className="showProducts">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ชื่อรายการ</th>
                                <th scope="col">ราคา</th>
                                <th scope="col">วันที่</th>
                            </tr>
                        </thead>
                        {products.map((val, key) => {
                            return (
                                <tbody key={key}>
                                    <tr>
                                        <td>{val.title}</td>
                                        <td>
                                            {val.price.toLocaleString("en-US")}{" "}
                                            ₭
                                        </td>
                                        <td id={getProductStatus(val.price)}>
                                            {val.date}
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </div>
            </div>
        </>
    );
}

export default App;

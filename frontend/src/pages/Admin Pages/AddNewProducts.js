import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { getAuthToken } from "../../util/Token";
import "./Admin CSS files/AddNewProducts.css";

function AddNewProducts() {
  const [inputFields, setInputFields] = useState([
    { productName: "", productDescription: "" },
  ]);
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const addFields = () => {
    let newfield = { productName: "", productDescription: "" };
    setInputFields([...inputFields, newfield]);
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  return (
    <>
      <h1 className="heading">Add New Products</h1>
      <Form method="post" className="add-new-products-form">
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name="productName"
                placeholder="Product Name"
                value={input.productName}
                required
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                name="productDescription"
                placeholder="Product Description"
                value={input.productDescription}
                required
                onChange={(event) => handleFormChange(index, event)}
              />
              <button className="remove-button" onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
        <button
          type="submit"
          className="submit-button"
        >
          Submit
        </button>
      </Form>
      <button className="add-button" onClick={addFields}>Add More..</button>
    </>
  );
}
export default AddNewProducts;

export async function addNewProductsAction({ request, params }) {
  const formData = await request.formData();
  const dataList = [];
  let i = 1;

  let object = {};
  for (const value of formData.values()) {
    if (i % 2 === 1) {
      object["productName"] = value;
    } else {
      object["productDescription"] = value;
      dataList.push(object);
      object = {};
    }
    i++;
  }
  const response = await fetch("http://localhost:8080/admin/add_new_products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getAuthToken(),
    },
    body: JSON.stringify(dataList),
  });
  if (!response.ok) {
    console.log("Could not upload list of products");
  } else {
    return redirect("/user/products");
  }
}

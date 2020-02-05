const apiCompanies = "https://acme-users-api-rev.herokuapp.com/api/companies";
const apiProducts = "https://acme-users-api-rev.herokuapp.com/api/products";
const productsID = document.getElementById("products");
const companiesID = document.querySelector("#company");
let tabProducts = document.getElementById('products_');
let tabCompanies = document.getElementById('companies_');
// console.log(companiesID);
// console.log(productsID);
let companies = axios.get(apiCompanies);
let products = axios.get(apiProducts);

let data = Promise.all([companies, products]).then((response) => {
	c = response[0].data;
	p = response[1].data;
	return [c, p];
});

const renderProducts = () => {
	tabCompanies.classList.remove('show')
	tabCompanies.classList.remove('active')
	tabProducts.classList.add('show');
	tabProducts.classList.add('active')
	data.then((response) => {
		let prHtml = response[1]
			.map((product) => {
				// console.log(product);
				return `<tr>
            <th scope="row">${product.id}</th>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.suggestedPrice}</td>
            <td>${product.createdAt}</td>
            <td>${product.updatedAt}</td>
          </tr>`;
			})
			.join("");
		// console.log(prHtml);

		productsID.innerHTML = prHtml;
	});
};

renderProducts()

const renderCompanies = () => {
	tabCompanies.classList.add('show')
	tabCompanies.classList.add('active')
	tabProducts.classList.remove('show');
	tabProducts.classList.remove('active')
	data.then((response) => {
		// console.log(response[0]);
		let coHtml = response[0]
			.map((company) => {
				// console.log(product);
				return `<tr>
            <th scope="row">${company.id}</th>
            <td>${company.name}</td>
            <td>${company.phone}</td>
            <td>${company.state}</td>
            <td>${company.catchPhrase}</td>
            <td>${company.createdAt}</td>
            <td>${company.updatedAt}</td>
          </tr>`;
			})
			.join("");
		// console.log(coHtml);
		companiesID.innerHTML = coHtml;
	});
};


window.addEventListener("hashchange", () => {
	let hash = window.location.hash.slice(1);
	 hash === "companies" ? renderCompanies() : renderProducts();
});


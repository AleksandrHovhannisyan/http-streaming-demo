const itemsList = document.querySelector('ol');

async function fetchItems() {
	const response = await fetch('/items');
	const reader = response.body.getReader();
	const decoder = new TextDecoder('utf-8');

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		const chunk = decoder.decode(value, { stream: true }).trim();
		const item = JSON.parse(chunk);
		console.log('Received item:', item);

		const li = document.createElement('li');
		li.textContent = item.id;
		itemsList.appendChild(li);
	}
}

fetchItems();

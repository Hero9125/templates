var  fetchList = (url,tableId) => {
		document.getElementById('voyager-loader').style.display = 'block';
		return new Promise(resolve => {
			fetch(url).then((response)=>{
				response.json().then((response)=>{
					resolve(response);
				})
			})
  		});
		

		// return list;
}

var getList = async (url,table) =>{
	const result = await fetchList(url,table);
	document.getElementById('voyager-loader').style.display = 'none';
	tableHTML(result,table);
}

var tableHTML = (response,table)=>{
	var t = '';
	var pageLink = '';
	pageLink +=`<ul class="pagination">`;
	// console.log(response.result)
	switch(response.slug){
		case 'subscription':
			var ObjectData = response.result.data;
			for (var i = 0 ; i <= ObjectData.length - 1; i++) {
				t += `<tr><td>${i+1}</td><td>${ObjectData[i].customer.name}</td><td>${ObjectData[i].customer.email}</td><td>${ObjectData[i].status}</td><td>${ObjectData[i].subscription_id}</td><td>${ObjectData[i].plan_id}</td><td>${ObjectData[i].created_at}</td><tr>`;
			} 
			document.getElementById(table).innerHTML = t;
			// (t);
		break;
	}
	// Customized Pagination;
	var totalRecords = Math.ceil(response.result.total/response.result.per_page);
	for (var i = 1; i <= totalRecords; i++) {
		if(i == response.result.current_page){
			pageLink +=`<li data-page="${i}" class="click active"><a data-page="${i}" class="click" href="javascript:void(0)">${i}</a></li>`;
		}else{
			pageLink +=`<li data-page="${i}" class="click"><a data-page="${i}" class="click" href="javascript:void(0)">${i}</a></li>`;
		}
	}
	pageLink += `</ul>`;
	// console.log(pageLink);
	document.getElementById('pagination-link').innerHTML = pageLink;
}

var paginationON = (url,table) => {
	document.addEventListener('click',(e)=>{
		var pageNo = e.target.getAttribute('data-page');
		if (e.target.classList.contains('click')) {
			
			getList(`${url}?page=${pageNo}`,table);
			
		}
	})
}
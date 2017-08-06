var Promise = function () {
        /* initialize promise */
};
Promise.prototype.then = function (onResolved, onRejected) {
     /* invoke handlers based upon state transition */
};
Promise.prototype.resolve = function (value) {
     /* move from unfulfilled to resolved */
     value.data.products.forEach(function (id) {
            localStorage.setItem(id.ID, JSON.stringify(id));
        });
     var searchResult = document.getElementById('searchResult');
     searchResult.append(value.status+": data already saved in localstorage ");
};
 
Promise.prototype.reject = function (error) {
 /* move from unfulfilled to rejected */
    var searchResult = document.getElementById('searchResult');
    searchResult.append("there is no results. could you please try again.");
};

function searchData() {
    var url, xhr, results, promise;
    url = 'http://api.cewe-community.com/v2/products';
    promise = new Promise();
    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function (e) {
        if (this.status === 200) {
            results = JSON.parse(this.responseText);
            promise.resolve(results);
        }
    };

    xhr.onerror = function (e) {
        promise.reject(e);
    };

    xhr.send();
    return promise;
}
function loadData() {
    var searchID = document.getElementById("searchID").value;
    var data = JSON.parse(localStorage.getItem(searchID));
    if (!data) {
        document.getElementById("searchResults").value = "There is not results with your serach ID.";
    }else{
        document.getElementById("searchResults").value = data.ID + ": " + data.Title;
    }
}


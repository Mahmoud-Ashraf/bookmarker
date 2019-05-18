var sites = [],
    msg;

window.addEventListener("load", function () {
    sites = JSON.parse(localStorage.getItem("sites"));
    if(sites !== null){
        displayData();
    }else{
        sites = [];
    }
    // console.log(sites);
});

function bookmarkSite() {
    var siteName = document.getElementById("site-name").value,
        siteUrl = document.getElementById("site-url").value,
        alert = document.getElementById("alert");

    // Input Validation
    if ((siteUrl.indexOf("http://") === 0 || siteUrl.indexOf("https://") === 0) && siteUrl.lastIndexOf(".") ==  siteUrl.length - 4 && siteUrl.indexOf(" ") == -1 && siteName != "") {
        var checked = checkIfStored(siteUrl);
        if (checked == "false") {
            msg = "This URL Is Bookmarked Before";
            alertMsg(msg,alert);
        }else {
            addBookmark (alert,siteName,siteUrl);
        }  
    }else {
        msg = "Please Insert The Name And A Valid URL";
        alertMsg(msg,alert);
        clearForm();
    }
    
};

// Add Bookmark to table
function addBookmark(alert,siteName,siteUrl) {
    alert.style.display = "none";
    var site = {name : siteName, url : siteUrl};
    sites.push(site);
    localStorage.setItem("sites",JSON.stringify(sites));
    displayData();
    clearForm();
}

// Display Bookmarked Sites in a table
function displayData() {
    var tbody = document.getElementById("sites-table-content"),
        trs = "";
    for (var i = 0; i < sites.length; i++) {
        var url = "`" + sites[i].url + "`";
        trs += "<tr><td>" + (i + 1) + "</td><td>" + sites[i].name + "</td><td><a class='btn btn-success text-white btn-sm mr-3' href='" + sites[i].url + "'>Visit</a><a class='btn btn-danger text-white btn-sm' href='#' onclick='deleteSite(" + url + ")'>Delete</a></td></tr>";
    }
    tbody.innerHTML = trs;
}
// Delete a Bookmark
function deleteSite(url) {
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].url === url) {
            sites.splice(i,1);
        };
    };
    localStorage.setItem("sites",JSON.stringify(sites));
    displayData();
}
// Clear Inputs Fields After Adding
function clearForm() {
    var inputs = document.getElementsByTagName("input");
    for (var i=0; i < inputs.length; i++) {
      inputs[i].value = ""
    }
}
// Check If The Url Is Stored Before Or Not
function checkIfStored (siteUrl) {
    console.log(siteUrl);
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].url == siteUrl) {
            return "false";
        }
    }
}
// To Show An Alert Msg For Wrong Inputs
function alertMsg (msg,alert) {
    alert.style.display = "block";
    alert.innerText = msg;
    clearForm();
}
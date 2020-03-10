
var src_url = "http://127.0.0.1:5500/";
// var src_url = "http://172.105.158.108:5500/";


var seconds = 1000;
var loader_seconds = 3000;

function Load_members_view () {window.location="ViewMembersGui.html"};
function Load_index () {window.location="index.html"}




function Fetch_All_Members_Data ()
{
    document.getElementById("all-members-loader").style.display="block";
    setTimeout(All_Members_Data,loader_seconds)
}

// ==================
function All_Members_Data ()
    {
        document.getElementById("all-members-loader").style.display="none";
        let req = new XMLHttpRequest();
        req.open('post', src_url+'members_view_all',true)
        req.onload = function ()
            {
                let results = JSON.parse(this.responseText);
                if (! results || !results.length)
                    {
                        alert("No results found")
                    }
                else
                    {
                        let tbody = document.getElementById('show-all-tbody');
                        tbody.innerHTML = ' ';
    
                        // draw table
                        let td,tr;
                        // add table headings
                        let th_names = new Array ();
                        th_names.push(["Names","Location", "Contacts"]);
                        let columns_to_count = th_names[0].length;
                        row = tbody.insertRow(-1); 
                        for (let looper =0; looper<columns_to_count; ++looper)
                            {
                                let headerNames = document.createElement("th");
                                headerNames.className='js_table_headers'
                                headerNames.innerHTML = th_names[0][looper];
                                row.appendChild(headerNames)
                            }
    
                        for (let table_row = 0; table_row < results.length; ++table_row)
                            {
                                tr = document.createElement('tr');
                                tr.className='js_table_row';
                                for (let table_data = 0; table_data< (results[table_row].length);++table_data)
                                    {
                                        td = document.createElement('td');
                                        td.setAttribute("align", "center"); 
                                        td.innerHTML = results[table_row][table_data];
                                        tr.appendChild(td)
                                    }
                                    tbody.appendChild(tr)
                            }
                    }
            }
            let div_tag = document.getElementById('show-all-tbody-div');
            req.send(div_tag);  
            setTimeout(save_show_all_data,seconds);      
    }



// ========================================================================
// On storage
function save_show_all_data ()
{
    let data = document.getElementById ("show-all-tbody").innerHTML;
    localStorage.setItem("all_members", data);
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function Load_offline_data () 
{
    document.getElementById("show-all-tbody").innerHTML = localStorage.getItem("all_members");
}
 $(document).ready(function() {
 	alert('fd');
        var dataTable = $('#example').DataTable( {
            //"processing": true,
        /*    "serverSide": true,
            "ajax":{
                url :"/index/tabledata", // json datasource
                // method  , by default get
                error: function(err){  // error handling
                    $(".employee-grid-error").html("");
                    $("#employee-grid").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                    $("#employee-grid_processing").css("display","none");
 
                }
            },
        */  "ajax": {
                     url: "/register",
                     type: "post"


                    },
        "columns": [
            { "data": "Name" },
            { "data": "Position" },
            { "data": "Office" },
            { "data": "Age" },
            { "data": "start date" },
            { "data": "Salary" }
        ]
            
        } );
    } );
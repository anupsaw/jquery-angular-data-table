/* $(document).ready(function() {
        $('#example').DataTable({
            "serverSide": false,
            "ajax":{
                url :"/table/table", // json datasource
            }    
        
           
        });
    }); 














/*

 $(document).ready(function() {
 	
        var dataTable = $('#example').DataTable( {
          /*  "processing": true,
           "serverSide": true,
            "ajax":{
                url :"/index/tabledata", // json datasource
                // method  , by default get
                error: function(err){  // error handling
                    $(".employee-grid-error").html("");
                    $("#employee-grid").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                    $("#employee-grid_processing").css("display","none");
 
                }
            },

      
        serverSide: true,  
    "ajax": {
                     "url": "/table/table",
                     "type": "get",
                    
            }, 
            /*
       "ajax": "/table/table",                    
        "columns": [
            { "data": "first_name" },
            { "data": "last_name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "start date" },
            { "data": "salary" }
        ]
/*
    serverSide: true,
    ajax: function (data, callback, settings) {
    $.ajax({
      url: '/table/table',
      type: 'POST',
      data: data,
      success:function(data){
        callback(data);
        // Do whatever you want.
      }
    });
  } 
   "ajax":{
                url :"/index/tabledata", // json datasource
                // method  , by default get
                success: function(data) {
                    console.log('success_table_data',data);
                     $("#example").append('<tr>'+data+'</tr>');
                    
                },
                error: function(data){  // error handling
                    $(".employee-grid-error").html("");
                    $("#employee-grid").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                    $("#employee-grid_processing").css("display","none");
 
                }
            }
  
            
        } );
    } );*/
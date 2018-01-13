<!DOCTYPE html>
<html>
<head>
    <title>Communication Sheet</title>
    <style>
        .text-left{text-align:left;}
        .text-center{text-align:center;}
        .text-right{text-align:right;}
        td,th{border:1px solid #000000;}
        .boder{border:1px solid #000000;}
        .titleColumn{text-decoration: underline;}
        .incidentId{font-weight: bold;}
        .header{font-weight: bold;text-align: center; background: lightgray;}
        .leftheader{font-weight: bold;background: lightgray;}
    </style>
    <?php 
             $data = array
             (
             array("",'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
             array("Open Incident",65, 59, 80, 81, 56, 55, 40, 100, 120, 30, 20, 21),
             array("Assign",60, 48, 40, 19, 86, 27, 90, 70, 99, 25, 30, 18),
             array("Analyzing",60, 48, 40, 19, 86, 27, 90, 70, 99, 25, 30, 18),
             array("Fixing",60, 48, 40, 19, 86, 27, 90, 70, 99, 25, 30, 18),
             array("Testing",60, 48, 40, 19, 86, 27, 90, 70, 99, 25, 30, 18),
             array("Confirmation",60, 48, 40, 19, 86, 27, 90, 70, 99, 25, 30, 18),
             array("Closed",50, 38, 20, 34, 70, 37, 90, 90, 95, 15, 25, 12)
             ); 

             $data1 = array
             (
             array("December 2017",'1', '4', '5', '6', '7', '8', '11', '12', '13', '14', '15', '18', '19', '20', '21', '22', '25', '26', '27', '28', '29'),
             array("Open Incident",5, 3, 3, 5, 7, 8, 2, 2, 2, 4, 2, 3, 6, 3, 3, 5, 3, 3, 5, 7, 8),
             array("Assign",2, 4, 2, 2, 4, 3, 5, 5, 5, 3, 3, 8, 3, 7, 5, 5, 5, 4, 3, 5, 4),
             array("Analyzing",1, 5, 2, 1, 5, 4, 5, 2, 1, 5, 4, 4, 3, 5, 7, 2, 4, 2, 2, 4, 3),
             array("Fixing",1, 5, 2, 1, 5, 4, 5, 2, 1, 5, 4, 4, 3, 5, 7, 2, 4, 2, 2, 4, 3),
             array("Testing",5, 3, 3, 5, 7, 8, 2, 2, 2, 4, 2, 3, 6, 3, 3, 5, 3, 3, 5, 7, 8),
             array("Confirmation",2, 4, 2, 2, 4, 3, 5, 5, 5, 3, 3, 8, 3, 7, 5, 5, 5, 4, 3, 5, 4),
             array("Closed",5, 3, 3, 5, 7, 8, 2, 2, 2, 4, 2, 3, 6, 3, 3, 5, 3, 3, 5, 7, 8)
             );

             $data2 = array
             (
             array("Root Cause / Date",'1', '4', '5', '6', '7', '8', '11', '12', '13', '14', '15', '18', '19', '20', '21', '22', '25', '26', '27', '28', '29','Total'),
             array("CR Side Impact",0, 1, 0, 3, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 10),
             array("Data Migration Issue",0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2),
             array("Deployment Issue",0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 5),
             array("Design Issue",4, 0, 0, 2, 0, 2, 0, 1, 0, 1, 0, 0, 3, 0, 2, 0, 0, 0, 5, 0, 0, 20),
             array("Newly Used Function",0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 5, 0, 0, 10),
             array("Program Bugs",5, 0, 3, 0, 0, 3, 0, 2, 0, 1, 10, 17, 3, 2, 2, 1, 9, 0, 5, 0, 11, 50),
             
             );


             $data3 = array
             (
             array("Division / Date",'1', '4', '5', '6', '7', '8', '11', '12', '13', '14', '15', '18', '19', '20', '21', '22', '25', '26', '27', '28', '29','Total'),
             array("Credit Analyst",0, 1, 0, 3, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 3),
             array("Finance",0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30),
             array("General Affairs",0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2),
             array("IT SPD",4, 0, 0, 2, 0, 2, 0, 1, 0, 1, 0, 0, 3, 0, 2, 0, 0, 0, 5, 0, 0, 20),
             array("Marketing",0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 5, 0, 0, 15),
             array("Collection",5, 0, 3, 0, 0, 3, 0, 2, 0, 1, 10, 17, 3, 2, 2, 1, 9, 0, 5, 0, 11, 10),
             array("All",5, 0, 3, 0, 0, 3, 0, 2, 0, 1, 10, 17, 3, 2, 2, 1, 9, 0, 5, 0, 11, 25),
             
             );
             ?>
</head>
<body>
     

        <h1>Incident Report Summarize</h1>
        <h3>In Current Year 2017</h3>
        <table class="table table-bordered" cellpadding="5" width:"100%" style="font-size: 10px;">
            <?php 
             for($i=0;$i<count($data);$i++) {
                echo('<tr>');
                if($i==0){
                    for($j=0;$j<count($data[$i]);$j++) {
                        if($j==0){
                        echo('<td class="header" style="width:100px" bgcolor="#d3d3d3">' . $data[$i][$j] . '</td>');
                        }else{
                            echo('<td class="header" bgcolor="#d3d3d3">' . $data[$i][$j] . '</td>');
                        }
                      }    
                }else{
                    for($j=0;$j<count($data[$i]);$j++) {
                        if($j==0){
                            echo('<td class="leftheader" style="width:100px" bgcolor="#d3d3d3">' . $data[$i][$j] . '</td>');
                        }else{
                            echo('<td class="text-center">' . $data[$i][$j] . '</td>');
                        }
                      }
                }
                 
                echo('</tr>');
              }?>
        </table>

        <br/>
        <br/>
        <h3>In December 2017</h3>
        <table class="table table-bordered" cellpadding="5" width:"100%" style="font-size: 10px;">
            <?php 
             for($i=0;$i<count($data1);$i++) {
                echo('<tr>');
                if($i==0){
                    for($j=0;$j<count($data1[$i]);$j++) {
                        if($j==0){
                        echo('<td style="width:100px; font-weight: bold;" bgcolor="#d3d3d3">' . $data1[$i][$j] . '</td>');
                        }else{
                            echo('<td class="header" style="width:30px" bgcolor="#d3d3d3">' . $data1[$i][$j] . '</td>');
                        }
                      }    
                }else{
                    for($j=0;$j<count($data1[$i]);$j++) {
                        if($j==0){
                            echo('<td class="leftheader" style="width:100px" bgcolor="#d3d3d3">' . $data1[$i][$j] . '</td>');
                        }else{
                            echo('<td class="text-center" style="width:30px">' . $data1[$i][$j] . '</td>');
                        }
                      }
                }
                 
                echo('</tr>');
              }?>
        </table>
        <br/>
        <br/>
        <h3>Summarize By Root Cause (In December 2017)</h3>
        <table class="table table-bordered" cellpadding="5" width:"100%" style="font-size: 10px;">
            <?php 
             for($i=0;$i<count($data2);$i++) {
                echo('<tr>');
                if($i==0){
                    for($j=0;$j<count($data2[$i]);$j++) {
                        if($j==0){
                        echo('<td style="width:150px; font-weight: bold;" bgcolor="#d3d3d3">' . $data2[$i][$j] . '</td>');
                        }else{
                            if($j==(count($data2[$i])-1)){
                                echo('<td class="header" style="width:70px" bgcolor="#d3d3d3">' . $data2[$i][$j] . '</td>');
                            }else{
                                echo('<td class="header" style="width:30px" bgcolor="#d3d3d3">' . $data2[$i][$j] . '</td>');
                            }    
                            
                        }
                      }    
                }else{
                    for($j=0;$j<count($data2[$i]);$j++) {
                        if($j==0){
                            echo('<td class="leftheader" style="width:150px" bgcolor="#d3d3d3">' . $data2[$i][$j] . '</td>');
                        }else{
                            if($j==(count($data2[$i])-1)){
                                echo('<td class="text-center" style="width:70px">' . $data2[$i][$j] . '</td>');    
                            }else{
                                echo('<td class="text-center" style="width:30px">' . $data2[$i][$j] . '</td>');
                            }
                            
                        }
                      }
                }
                 
                echo('</tr>');
              }?>
        </table>
        <br/>
        <br/>
        <h3>Summarize By Division (In December 2017)</h3>
        <table class="table table-bordered" cellpadding="5" width:"100%" style="font-size: 10px;">
            <?php 
             for($i=0;$i<count($data3);$i++) {
                echo('<tr>');
                if($i==0){
                    for($j=0;$j<count($data3[$i]);$j++) {
                        if($j==0){
                        echo('<td style="width:150px; font-weight: bold;" bgcolor="#d3d3d3">' . $data3[$i][$j] . '</td>');
                        }else{
                            if($j==(count($data3[$i])-1)){
                                echo('<td class="header" style="width:70px" bgcolor="#d3d3d3">' . $data3[$i][$j] . '</td>');
                            }else{
                                echo('<td class="header" style="width:30px" bgcolor="#d3d3d3">' . $data3[$i][$j] . '</td>');
                            }    
                            
                        }
                      }    
                }else{
                    for($j=0;$j<count($data3[$i]);$j++) {
                        if($j==0){
                            echo('<td class="leftheader" style="width:150px" bgcolor="#d3d3d3">' . $data3[$i][$j] . '</td>');
                        }else{
                            if($j==(count($data3[$i])-1)){
                                echo('<td class="text-center" style="width:70px">' . $data3[$i][$j] . '</td>');    
                            }else{
                                echo('<td class="text-center" style="width:30px">' . $data3[$i][$j] . '</td>');
                            }
                            
                        }
                      }
                }
                 
                echo('</tr>');
              }?>
        </table>
</body>
</html>
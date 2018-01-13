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
        .tdd{font-weight: bold;text-align: center}
    </style>
</head>
<body>
        <h1>Incident Communication Sheet</h1>
        <table class="table table-bordered" cellpadding="5" width:"100%" style="font-size: 10px;">
                <tr><td><b>Incident No : </b>{{ $incident->idIncident }}</td>
                    <td><b>Modul : </b>{{ $incident->module }}</td>
                </tr>                   
                <tr><td><b>Report Date : </b>{{ $incident->raisedDate }}</td>
                    <td><b>Sub Modul : </b>{{ $incident->subModule }}</td>
                </tr>
                <tr><td><b>Priority : </b>{{ $incident->priority }}</td>
                    <td><b>Function : </b>{{ $incident->function }}</td>
                </tr>
            </table>
        <table class="table table-bordered" cellpadding="5" width:"100%" style="font-size: 10px;">
        <tr><td width="70%" height="150px">
            <br/>
            <b class="titleColumn">Issue Description</b>  
            <br/>{{ $incident->issueDescription }}
            <br/>
            <br/>

            </td>
            <td width="30%" rowspan="5" style="font-size: 9px;">
            <br/>
            <b style="text-align: center;text-decoration: underline;">Reason Of Incident</b>
            <br/>
            <b>Infra</b>
            <br/>
            <b>1. Sofware (M/W, OS)</b>
            <br/>1.1 Design Mistake
            <br/>1.2 Sizing Mistake
            <br/>1.3 Bugs
            <br/>1.4 Maintenance
            <br/>1.5 Config/Setup Mistake
            <br/>
            <b>2. Hardware</b>
            <br/>2.1 Design Mistake
            <br/>2.2 Sizing Mistake
            <br/>2.3 Failur
            <br/>2.4 Maintenance
            <br/>2.5 Config/Setup Mistake
            <br/>
            <b>3. Network</b>
            <br/>3.1 Design Mistake
            <br/>3.2 Sizing Mistake
            <br/>3.3 Failur
            <br/>3.4 Maintenance
            <br/>3.5 Config/Setup Mistake
            <br/>
            <br/>
            <b>Application</b>
            <br/>
            <b>4. Data</b>
            <br/>4.1 Data (Inteface File, DB, etc)
            <br/>4.2 Data Migration Mistake
            <br/>   
            <b>5. PG</b>
            <br/>5.1 PS Mistake/Unclear
            <br/>5.2 Program Mistake
            <br/>5.3 Program Mistake (Side Effect)
            <br/>5.4 Program Version
            <br/>5.5 Performance Tuning
            <br/>
            <b>6. SID/Tester</b>
            <br/>6.1 Operation Mistake
            <br/>
            <b>7. Vendor/ISD</b>
            <br/>7.1 URD Mistake/Unclear
            <br/>7.2 UI/SS Mistake/Unclear
            <br/>
            <b>8. User/ISD</b>
            <br/>8.1 New Requirement
            <br/>8.2 Change Spec
            <br/>8.3 BeuitifulISATION
            <br/>
            <b>9. Procedural Issue</b>
            <br/>9.1 Documented Wrongly
            <br/>9.2 Not Documented
            <br/>
            <b>10. Inquiry</b>
            <br/>
            <b>11. TMAP STD</b>
            <br/>
            <b>12. Other System</b>
            <br/>
            </td>
        </tr>
        
        <tr><th height="100px">
        <br/>
            <b class="titleColumn">Expected Result</b>  
            <br/>{{ $incident->expectedResult }}
            <br/>
            <br/>
            </th>
        </tr>
        <tr><th height="150px">
        <br/>
            <b class="titleColumn">Suspected Reason</b>
            <br/>
            {{ $incident->suspectedReason }}
            <br/>
            <br/>
            </th>
        </tr>
        
        <tr><th height="150px">
        <br/>
            <b class="titleColumn">Respon Taken</b>  
            <br/>{{ $incident->responTaken }}
            <br/>
            <br/>
            </th>
        </tr>
        <tr><th height="100px">
        <br/>
            <b class="titleColumn">Decided Solution</b>
            <br/>
            {{ $incident->decidedSolution }}
            <br/>
            <br/>
            </th>
        </tr>
        </table>
        <table class="table table-bordered" cellpadding="5" width:"100%">
        <tr>
        <th>
            
            <br/>
            <br/>
            <br/>
            <div class="tdd" style="padding: unset;">
            Programmer
            </div>
        </th>
        
        <th>
            
            <br/>
            <br/>
            <br/>
            <div class="tdd" style="padding: unset;">
            Bisnis Analyze
            </div>
        </th>
        
        <th>
            
            <br/>
            <br/>
            <br/>
            <div class="tdd" style="padding: unset;">
            Project Manager
            </div>
        </th>
        
        <th>
            
            <br/>
            <br/>
            <br/>
            <div class="tdd" style="padding: unset;">
            User
            </div>
        </th>
        </tr>
        </table>
</body>
</html>
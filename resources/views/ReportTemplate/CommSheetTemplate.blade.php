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
        <tr><td width="80%">
        <br/>
            <b>Incident No : </b>{{ $incident->idIncident }}
            <br/>
            <b>Modul : </b>{{ $incident->module }}
            <br/>
            <b>Function : </b>{{ $incident->function }}
            <br/>
            <b>Report Date : </b>{{ $incident->raisedDate }}
            <br/>

            </td>
            <td width="20%" rowspan="6" style="font-size: 9px;">
            <br/>
            <b style="text-align: center;text-decoration: underline;">Reason Of Incident</b>
            <br/>
            <b>Infra</b>
            <br/>
            1. Sofware (M/W, OS)
            {{--  <br/>1.1 Design Mistake
            <br/>1.2 Sizing Mistake
            <br/>1.3 Bugs
            <br/>1.4 Maintenance
            <br/>1.5 Config/Setup Mistake  --}}
            <br/>
            2. Hardware
            {{--  <br/>2.1 Design Mistake
            <br/>2.2 Sizing Mistake
            <br/>2.3 Failur
            <br/>2.4 Maintenance
            <br/>2.5 Config/Setup Mistake  --}}
            <br/>
            3. Network
            {{--  <br/>3.1 Design Mistake
            <br/>3.2 Sizing Mistake
            <br/>3.3 Failur
            <br/>3.4 Maintenance
            <br/>3.5 Config/Setup Mistake  --}}
            <br/>
            <br/>
            <b>Application</b>
            <br/>
            4. Data
            {{--  <br/>4.1 Data (Inteface File, DB, etc)
            <br/>4.2 Data Migration Mistake  --}}
            <br/>   
            5. PG
            <br/>
            6. SID/Tester
            <br/>
            7. Vendor/ISD
            <br/>
            8. User/ISD
            <br/>
            9. Procedural Issue
            <br/>
            10. Inquiry
            <br/>
            11. TMAP STD
            <br/>
            12. Other System
            <br/>
            </td>
        </tr>
        <tr><th>
        <br/>
            <b class="titleColumn">Issue Description</b>  
            <br/>{{ $incident->issueDescription }}
            <br/>
            <br/>
            </th>
        </tr>
        <tr><th>
        <br/>
            <b class="titleColumn">Expected Result</b>  
            <br/>{{ $incident->expectedResult }}
            <br/>
            <br/>
            </th>
        </tr>
        <tr><th>
        <br/>
            <b class="titleColumn">Suspected Reason</b>
            <br/>
            {{ $incident->suspectedReason }}
            <br/>
            <br/>
            </th>
        </tr>
        <tr><th>
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
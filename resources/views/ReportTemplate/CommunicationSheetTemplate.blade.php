<!DOCTYPE html>
<html>
<head>
    <title>Communication Sheet</title>
    <style>
        .text-left{text-align:left;}
        .text-center{text-align:center;}
        .text-right{text-align:right;}
        td,th{border:1px solid #000000;}
    </style>
</head>
<body>
        <h1>Communication Sheet</h1>
        <table class="table table-bordered" cellpadding="5" width:"100%">
            
            <tr>
                    <th ><div class="text-center">Incident No</div></th>
                    <th ><div class="text-center">Issue Description</div></th>
                    <th ><div class="text-center">Suspected Reason</div></th>
                    <th><div class="text-center">Decided Solution</div></th>
                </tr>
            
            @foreach($incidents as $incident)
            {{--  nobr="true"  untuk page break--}}
            <tr nobr="true">
            
                <td>{{ $incident->idIncident }}</td>
                <td>{{ $incident->issueDescription }}</td>
                <td>{{ $incident->suspectedReason }}</td>
                <td>{{ $incident->decidedSolution }}</td>
            </tr>
            @endforeach
        </table>
</body>
</html>
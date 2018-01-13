<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\IncidentModel;
use Input;
use PDF;

class CommunicationSheetCtrl extends Controller
{
    // percobaan pertama
    public function exportToPdf()
    {
        $incidents = IncidentModel::orderBy('idIncident', 'asc')->get();
        $html = view('ReportTemplate.CommunicationSheetTemplate', compact('incidents'));
    
        PDF::SetTitle('Communication Sheet');
        PDF::SetPrintHeader(false);
        PDF::SetPrintFooter(false);
        PDF::SetMargins(20, 10, 15);
        PDF::AddPage('P','LEGAL');
    
        PDF::writeHTML($html, true, false, true, false, '');
        // $filename = public_path() . '/report/employees.pdf';
        // PDF::output($filename,'I');
        // I untuk menampilkan di browser
        // F untuk menyimpan file
        PDF::Output(public_path() . '/report/employees.pdf', 'I');
    }

    // pecobaan kedua
    public function generateReport($idIncident)
    {
        // $incidents = IncidentModel::orderBy('idIncident', 'asc')->get();
        //$issueForm['idIncident']
        
        // $incident = array('idIncident'=>$incidents[0]['incidents']
        //                 , 'issueDescription'=>$incidents[0]['issueDescription']
        //                 , 'suspectedReason'=>$incidents[0]['suspectedReason']
        //                 , 'decidedSolution'=>$incidents[0]['decidedSolution']);
                
        
        // $incidents->first(function($value, $key) {
        //     $idIncident=$incidents->incidents;
        //     $issueDescription=$incidents->issueDescription;
        //     $suspectedReason=$incident->suspectedReason;
        //     $decidedSolution=$incident->decidedSolution;
        // });
        // $idIncident=$incidents[0]['incidents'];
        // $issueDescription=$incidents[0]['issueDescription'];
        // $suspectedReason=$incidents[0]['suspectedReason'];
        // $decidedSolution=$incidents[0]['decidedSolution'];

        // echo 'Hello';  
        // $idIncident = $request->input('idIncident');
        $incident = IncidentModel::where('idIncident', '=', $idIncident)->first();
        $html = view('ReportTemplate.CommSheetTemplate', compact('incident'));
    
        PDF::SetTitle('Communication Sheet');
        PDF::SetPrintHeader(false);
        PDF::SetPrintFooter(false);
        PDF::SetMargins(20, 10, 15);
        PDF::AddPage('P','LEGAL');
        $tagvs = array('p' => array(0 => array('h' => 0, 'n' => 0), 1 => array('h' => 0, 'n'=> 0)));
        PDF::SetHtmlVSpace($tagvs);
        PDF::SetCellPadding(0);
    
        PDF::writeHTML($html, true, false, true, false, '');
        PDF::Output(public_path() . '/report/CommSheet.pdf', 'I');
        // $succes = 'Create pdf succes';
        // return response()->success(compact('succes'));
    }

    public function getGenerateReportComm(Request $request)
    {
        $idIncident = $request->input('idIncident');
        $incident = IncidentModel::where('idIncident', '=', $idIncident)->first();
        $html = view('ReportTemplate.CommSheetTemplate', compact('incident'));
    
        PDF::SetTitle('Communication Sheet');
        PDF::SetPrintHeader(false);
        PDF::SetPrintFooter(false);
        PDF::SetMargins(20, 10, 15);
        PDF::AddPage('P','LEGAL');
    
        PDF::writeHTML($html, true, false, true, false, '');
        
        $succes = PDF::Output(public_path() . '/report/CommSheet.pdf', 'F');
        return response()->success(compact('succes'));
    }
    
    
    public function generateReportYearly()
    {
        //$incident = IncidentModel::where('idIncident', '=', $idIncident)->first();
        $html = view('ReportTemplate.ReportYearlyAccumulated');
    
        PDF::SetTitle('Report Yearly Accumulated');
        PDF::SetPrintHeader(false);
        PDF::SetPrintFooter(false);
        PDF::SetMargins(10, 10, 15);
        PDF::AddPage('L','LEGAL');
        $tagvs = array('p' => array(0 => array('h' => 0, 'n' => 0), 1 => array('h' => 0, 'n'=> 0)));
        PDF::SetHtmlVSpace($tagvs);
        PDF::SetCellPadding(0);
    
        PDF::writeHTML($html, true, false, true, false, '');
        PDF::Output(public_path() . '/report/ReportYearlyAccumulated.pdf', 'I');
        // $succes = 'Create pdf succes';
        // return response()->success(compact('succes'));
    }
}

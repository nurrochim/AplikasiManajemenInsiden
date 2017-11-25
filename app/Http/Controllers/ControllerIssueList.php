<?php

namespace App\Http\Controllers;
use App\ModelIssue;
use App\Http\Requests;
use Illuminate\Http\Request;
use Input;

class ControllerIssueList extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getIndex($id = null) {
        if ($id == null) {
            $issues = ModelIssue::orderBy('id', 'asc')->get();
            return response()->success(compact('issues'));
        }
    }
    // public function findIncidentAnalyzing() {
    //     return ModelIncident::where('pic_analyzing', "Aulia")->orderBy('id', 'asc')->get();
    // }

    public function postIssue() {
        $issue = new ModelIssue;
        $issue->raise_date = Input::get('raise_date');
        $issue->priority = Input::get('priority');
        $issue->status = Input::get('status');
        $issue->module = Input::get('module');
        $issue->sub_module = Input::get('sub_module');
        $issue->pic = Input::get('pic');
        $issue->category_group = Input::get('category_group');
        $issue->category_root_cause = Input::get('category_root_cause');
        $issue->issue_description = Input::get('issue_description');
        $issue->suspected_reason = Input::get('suspected_reason');
        $issue->respon_taken = Input::get('respon_taken');
        $issue->decided_solution = Input::get('decided_solution');
        $issue->target_fixed_date = Input::get('target_fixed_date');
        $issue->finish_fixed_date = Input::get('finish_fixed_date');
        $issue->closed_date = Input::get('closed_date');
        $issue->closed_by = Input::get('closed_by');
        $issue->pic_analyzing = Input::get('pic_analyzing');
        $issue->finish_analyzing = Input::get('finish_analyzing');
        $issue->pic_fixing = Input::get('pic_fixing');
        $issue->finish_fixing = Input::get('finish_fixing');
        $issue->pic_testing = Input::get('pic_testing');
        $issue->finish_testing = Input::get('finish_testing');
        $issue->deployment_code = Input::get('deployment_code');
        $issue->deployment_date = Input::get('deployment_date');
        $issue->save();

        return response()->success($issue);
    }

    public function getIssueShow($id)
    {
        $issue = ModelIssue::find($id);

        return response()->success($issue);
    }

    public function putIssueShow()
    {
        $issueForm = Input::get('data');
        $affectedRows = ModelIssue::where('id', '=', intval($issueForm['id']))->update($issueForm);

        return response()->success($issueForm);
    }

    public function deleteIssue($id)
    {
        ModelIssue::destroy($id);

        return response()->success('success');
    }

    // /**
    //  * Store a newly created resource in storage.
    //  *
    //  * @param  Request  $request
    //  * @return Response
    //  */
    // public function postIncident(Request $request) {
    //     $incident = new ModelIncident;
    //     $incident->raise_date = $request->input('raise_date');
    //     $incident->priority = $request->input('priority');
    //     $incident->status = $request->input('status');
    //     $incident->module = $request->input('module');
    //     $incident->sub_module = $request->input('sub_module');
    //     $incident->pic = $request->input('pic');
    //     $incident->category_group = $request->input('category_group');
    //     $incident->category_root_cause = $request->input('category_root_cause');
    //     $incident->issue_description = $request->input('issue_description');
    //     $incident->suspected_reason = $request->input('suspected_reason');
    //     $incident->respon_taken = $request->input('respon_taken');
    //     $incident->decided_solution = $request->input('decided_solution');
    //     $incident->target_fixed_date = $request->input('target_fixed_date');
    //     $incident->finish_fixed_date = $request->input('finish_fixed_date');
    //     $incident->closed_date = $request->input('closed_date');
    //     $incident->closed_by = $request->input('closed_by');
    //     $incident->pic_analyzing = $request->input('pic_analyzing');
    //     $incident->finish_analyzing = $request->input('finish_analyzing');
    //     $incident->pic_fixing = $request->input('pic_fixing');
    //     $incident->finish_fixing = $request->input('finish_fixing');
    //     $incident->pic_testing = $request->input('pic_testing');
    //     $incident->finish_testing = $request->input('finish_testing');
    //     $incident->deployment_code = $request->input('deployment_code');
    //     $incident->deployment_date = $request->input('deployment_date');
    //     $incident->save();

    //     return 'Incident record successfully created with id ' . $incident->id;
    // }
    
    // public function createNewIncidentMini(Request $request) {
    //     $incident = new ModelIncidentMini;
    //     $incident->raise_date = $request->input('raise_date');
    //     $incident->priority = $request->input('priority');
    //     $incident->issue_description = $request->input('issue_description');
    //     $incident->module = $request->input('module');
    //     $incident->sub_module = $request->input('sub_module');
    //     $incident->pic_analyzing = $request->input('pic_analyzing');
    //     $incident->pic_fixing = $request->input('pic_fixing');
    //     $incident->pic_testing = $request->input('pic_testing');
    //     $incident->save();

    //     return 'Incident record successfully created with id ' . $incident->id;
    // }
    
    // public function updateIncidentAnalyzing(Request $request, $id) {
    //     $incident = ModelIncidentAnalyzing::find($id);
        
    //     $incident->category_group = $request->input('category_group');
    //     $incident->category_root_cause = $request->input('category_root_cause');
    //     $incident->issue_description = $request->input('issue_description');
    //     $incident->suspected_reason = $request->input('suspected_reason');
    //     $incident->respon_taken = $request->input('respon_taken');
    //     $incident->decided_solution = $request->input('decided_solution');
    //     $incident->save();

    //     return "Sucess updating Incident #" . $incident->id;
    // }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  int  $id
    //  * @return Response
    //  */
    // public function show($id) {
    //     return ModelIncident::find($id);
    // }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  Request  $request
    //  * @param  int  $id
    //  * @return Response
    //  */
    // public function updateByCreator(Request $request, $id) {
    //     $incident = ModelIncidentMini::find($id);

    //     $incident->raise_date = $request->input('raise_date');
    //     $incident->priority = $request->input('priority');
    //     $incident->issue_description = $request->input('issue_description');
    //     $incident->module = $request->input('module');
    //     $incident->sub_module = $request->input('sub_module');
    //     $incident->pic_analyzing = $request->input('pic_analyzing');
    //     $incident->pic_fixing = $request->input('pic_fixing');
    //     $incident->pic_testing = $request->input('pic_testing');
    //     $incident->save();

    //     return "Sucess updating Incident #" . $incident->id;
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return Response
    //  */
    // public function destroy(Request $request) {
    //     $incident = ModelIncident::find($request->id);
    //     $incident->delete();

    //     return "Incident record successfully deleted #" . $request->id;
    // }
}

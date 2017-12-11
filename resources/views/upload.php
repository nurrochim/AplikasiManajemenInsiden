<?php
if ( !empty( $_FILES ) ) {
    $request = $_REQUEST;
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $public_path = public_path();

    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );
    echo $json;
} else {
    echo 'No files';
}
?>
<?php

class api_class {
    public $send_data = ''; // The data to be send (content body as json) 
    public $api_srv_url; // The remote api server URL 
    public $api_port_url; // The remote api server port
    // Response data 
    public $error_code = 0;
    public $desc = null;
    // Send method 
    public $method = 'GET';
    // Send content type 
    public $content_type;
    public $headers = array();
    public $api_key = "";
 
    /*
     * Class init
     *
     */
    function __construct() {
        $this->content_type= "application/application/json"; 
        $this->api_key ='98d363bd71e4e39bc1ff435986b717e1';
    }
    /**
     * Set send params fro the requested API
     * @param type $data_params - parameters to send to the curl
    
     * @param type $do_send decide if need to execute now, or later
     */
    function init($data_params = array(), $do_send = false) {
        $function =(isset($data_params['function']))?$data_params['function']:"";
        $search_str = "";
        $get_params = array("api_key"=>$this->api_key);
        if(isset($data_params['data']['value'])){ //to search ..
            $get_params["query"]= urlencode($data_params ['data']['value']);
        }
        $search_str = http_build_query($get_params,'',"&");
        $api_url = 'https://api.thedb.org/3/'.$function."?".$search_str ;
        $this->api_srv_url = $api_url ;
        $this->api_port_url = '443';
        $this->send_data = $data_params;
        $this->headers[] = 'Content-Type:' . $this->content_type;
        // If to do send 
        if ($do_send) {
            return $this->send();
        }
    }
    /*
     * Send calls by HTTP and return the results
     *
     */
    function send() {
        $ch = curl_init();
        $srv_url = $this->api_srv_url;
        $srv_port = $this->api_port_url;
        
        curl_setopt($ch, CURLOPT_URL, $srv_url);
        curl_setopt($ch, CURLOPT_PORT, $srv_port);
        curl_setopt($ch, CURLOPT_USERAGENT , 'Codular Sample cURL Request');

        if ($this->method == 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
        }
        // Headers
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers);

        if ($this->method == "POST" && !empty($this->send_data)) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $this->send_data);
        }
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);      
        $ret = curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close($ch); 
        return $this->parse_send_response($info, $ret);
    }
    /*
     * Parse the send response
     *
     */
    function parse_send_response($http_res_info, $ret_str) {
        // If http code <> 200 (http error) 
        if ($http_res_info['http_code'] != 200) {
            $this->error_code = $http_res_info['http_code'];
            $this->desc = 'HTTP error';
            return null;
        }
        $ret_json_arr = json_decode($ret_str, true);
        return $ret_json_arr;
    }
}

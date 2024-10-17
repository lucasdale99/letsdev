#Lambda
variable "function_name" {
  default = ""
}

variable "function_description" {
  default = ""
}

variable "s3_deploy_bucket" {
  default = null
}

variable "s3_deploy_bucket_key" {
  default = null
}

variable "deploy_package_to_s3" {
  default = true
}

variable "filename" {
  default = null
}

variable "source_code_hash" {
  default = null
}

variable "handler" {
  default = "lambda_function.lambda_handler"
}

variable "runtime" {
  default = "python3.7"
}

variable "memory_size" {
  default = null
}

variable "timeout" {
  default = 10
}

variable "environment_variables" {
  default = {}
}

variable "vpc_config" {
  default = null
}

variable "exec_role_arn" {
  default = ""
}

variable "publish" {
  default = false
}

variable "include_source_hash" {
  default = false
}

variable "include_resourceid_tag" {
  default = false
}

variable "layers" {
  type    = list(string)
  default = null
}

variable "architectures" {
  type    = list(string)
  default = ["x86_64"]
}

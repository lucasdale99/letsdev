variable "s3_server_function_key" {
  description = "Name of the zipped lambda server function code package uploaded to S3"
  type        = string
}

variable "s3_image_optimizer_key" {
  description = "Name of the zipped lambda image optimizer code package uploaded to s3"
  type        = string

}

variable "s3_content_cache_prefix" {
  description = "Name of the zipped lambda cache code package uploaded to s3"
  type        = string

}

variable "s3_content_assets_key" {
  description = "Name of the zipped lambda assets package uploaded to s3"
  type        = string

}

variable "lambda_handler" {
  description = "Function entry point in code"
  type        = string

}

variable "lambda_memory_size" {
  description = "Amount of memory in MB the lambda function can use at runtime"
  type        = number

}

variable "lambda_runtime" {
  description = "Identifier of the function's runtime. See https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime for valid values."
  type        = string

}

variable "lambda_timeout" {
  description = "Amount of time the Lambda Function has to run in seconds"
  type        = number
}

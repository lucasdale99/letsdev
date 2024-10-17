#apigateway
variable "api_binary_media_types" {
  default = ["*/*"]
}

variable "api_minimum_compression_size" {
  default = 1800
}

variable "api_logging_level" {
  default = "INFO"
}

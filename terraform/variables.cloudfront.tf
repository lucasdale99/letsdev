#Cloudfront Configuration

variable "default_root_object" {
  default = "index.html"
}

variable "price_class" {
  default = "PriceClass_100"
}

variable "web_acl_id" {
  default = ""
}

variable "retain_on_delete" {
  description = "If set to true, when CloudFront is destroyed the resource is marked as deleted in the Terraform State, but in reality its only disabled in AWS"
  type        = bool
  default     = false
}

variable "is_staging" {
  description = "Indicates a staging environment (Prod only)"
  type        = bool
  default     = false
}

variable "s3_content_name" {
  description = "The unique name of the S3 Bucket containing Assets and Cache folders to be accessed by CloudFront."
  type        = string
  default     = "content"
}

variable "aliases" {
  description = "List of CloudFront aliases"
  type        = list(string)
  default     = []
}

variable "custom_headers" {
  type = list(object({
    header   = string
    override = bool
    value    = string
  }))
  description = "Add custom headers to the CloudFront response headers policy"
  default = [{
    header   = ""
    override = false
    value    = ""
  }]
}

variable "cors" {
  description = "CORS (Cross-Origin Resource Sharing) configuration for the CloudFront distribution"
  type = object({
    allow_credentials = bool,
    allow_headers     = list(string)
    allow_methods     = list(string)
    allow_origins     = list(string)
    origin_override   = bool
  })

  default = {
    allow_credentials = false
    allow_headers     = ["*"]
    allow_methods     = ["ALL"]
    allow_origins     = ["*"]
    origin_override   = true
  }
}

variable "hsts" {
  description = "HSTS (HTTPS Strict Transport Security) configuration for the CloudFront distribution"
  type = object({
    access_control_max_age_sec = number
    include_subdomains         = bool
    override                   = bool
    preload                    = bool
  })
}

variable "remove_headers_config" {
  description = "Response header removal configuration for the CloudFront distribution"
  type = object({
    items = list(string)
  })

  default = { items = [] }
}

variable "acm_certificate_arn" {
  description = "The identifier for the AWS Certificate in AWS Certificate Manager"
  type        = string
  default     = null
}

variable "rt53_zone_id" {
  default = ""
}

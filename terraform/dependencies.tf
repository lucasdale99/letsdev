data "aws_s3_bucket" "s3_content" {
  bucket = var.s3_content_name
}

locals {
  component_name_prefix = "${var.environment}-portfolio"
  waf_web_acl_v3        = ""
}

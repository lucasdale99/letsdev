#Pipeline Config
environment = "prod"
aws_region  = "us-east-1"

acm_certificate_arn         = ""
rt53_zone_id                = ""
website_url                 = "letusdev.io"
cloudfront_log_bucket       = "prod.portfolio.logs"
site_content_s3_bucket_name = "prod.portfolio.us-east-1.static-web-site"
site_content_s3_object_path = "portfolio/builds/${build_number}"
code_deploy_s3_bucket_name  = "prod.portfolio.us-east-1.code-deploy"
code_deploy_s3_object_path  = "portfolio/builds/${build_number}"
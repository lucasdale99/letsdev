#Networking Config
api_binary_media_types       = ["*/*"]
api_minimum_compression_size = 1800
api_logging_level            = "INFO"

#Lambda Config
s3_server_function_key  = "server-function.zip"
s3_image_optimizer_key  = "image-optimization-function.zip"
s3_content_cache_prefix = "cache"
s3_content_assets_key   = "assets"
lambda_handler          = "index.handler"
lambda_memory_size      = 512
lambda_runtime          = "nodejs20.x"
lambda_timeout          = 30


#CDN Config
s3_content_name = "content"
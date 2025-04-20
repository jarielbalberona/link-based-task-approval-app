module "ecs" {
  source = "./modules/ecs"

  aws_region = var.aws_region
  environment = var.environment
  project = var.project
  project_api_port = var.project_api_port
  project_app_port = var.project_app_port
  aws_project_name = var.aws_project_name
  module_networking_main_id = module.networking.vpc_id
  module_networking_subnet1_id = module.networking.subnet1_id
  module_networking_subnet2_id = module.networking.subnet2_id
  module_networking_ecs_api_sg_id = module.networking.ecs_api_sg_id
  module_networking_ecs_app_sg_id = module.networking.ecs_app_sg_id
  module_networking_alb_sg_id = module.networking.alb_sg_id
  module_networking_lb_target_group_api_tg_id = module.networking.lb_target_group_api_tg_id
  module_networking_lb_target_group_app_tg_id = module.networking.lb_target_group_app_tg_id
  module_rds_aws_security_group = module.rds.rds_sg
  module_rds_aws_security_group_id = module.rds.rds_sg_id
  module_rds_db_user = module.rds.db_user
  module_rds_db_password = module.rds.db_password
  module_rds_endpoint = module.rds.db_endpoint
  module_rds_db_name = module.rds.db_name
}

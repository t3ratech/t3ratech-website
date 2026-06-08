terraform {
  backend "gcs" {
    bucket = "t3ratech-solutions-tfstate"
    prefix = "t3ratech-website/website"
  }
}

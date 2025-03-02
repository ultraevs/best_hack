from apscheduler.schedulers.background import BackgroundScheduler
from app.scheduler.tasks import monitor_csv_folder

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(monitor_csv_folder, 'interval', seconds=5)
    scheduler.start()
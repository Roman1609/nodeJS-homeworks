import dataFileManager from '../utils/DataFileManager.mjs'

class Job {
    static loadJobList() {
        try {
            return dataFileManager.loadData()
        } catch (error) {
            throw new Error("Can`t load the data");
        }
    }
    static addJobItem(jobObj) {
        try {
            const currentJobs = dataFileManager.loadData();
            const newJob = {
                ...jobObj,          
                id: currentJobs.length + 1 
            };

            dataFileManager.addItem(newJob);
        } catch (error) {
            throw new Error(`Помилка при додаванні роботи: ${error.message}`);
        }
    }
    static getJobById(id) {
        try {
            return dataFileManager.getItemById(id);
        } catch (error) {
            throw new Error (`Операція з даними не пройшла ${error.message}`)
        }
    }
    static updateJobById(id, jobData) {
        try {
            dataFileManager.updateItemById(id, jobData);
        } catch (error) {
            throw new Error (`Операція з даними не пройшла ${error.message}`)
        }
    }
    static deleteJobById(id) {
        try {
            dataFileManager.deleteItemById(id);
        } catch (error) {
            throw new Error (`Операція з даними не пройшла ${error.message}`)
        }
    }
}

export default Job
class ChildProcessService {
  constructor(totalChildProcesses) {
    this.totalChildProcesses = totalChildProcesses

    this.childResults = [];

    this.handleResponse = this.handleResponse.bind(this);
  }

  handleResponse(result) {

    console.log('ChildProcessService > handleResponse');
    //console.log('ChildProcessService >> > handleResponse', result);
    this.totalChildProcesses--;

    this.childResults.push(result);

    console.log('ChildProcessService >>>>> handleResponse', this.totalChildProcesses, result);

    if (!this.totalChildProcesses) process.send(this.childResults);
  }
}

module.exports = { ChildProcessService };

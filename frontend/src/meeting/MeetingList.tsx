import './MeetingList.css'

const MeetingList = (identity:string)=>{
    if (identity === "student"){
        return (
            <>
              <div className="stuDiv">
                <div className="stuDiv-2">
                  <div className="stuDiv-3">
                    <div className="builder-columns div-4">
                      <div className="builder-column stuColumn">
                        <div className="div-5">
                          <div className="builder-columns div-6">
                            <div className="builder-column column-2">
                              <div className="div-7">ID: 12345678</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="builder-column stuColumn-3">
                        <div className="div-8">Join</div>
                      </div>
                    </div>
                  </div>
                  <div className="stuDiv-9">
                    <div className="builder-columns stuDiv-10">
                      <div className="builder-column column">
                        <div className="stuDiv-11">
                          <div className="builder-columns stuDiv-12">
                            <div className="builder-column stuColumn-4">
                              <div className="stuDiv-13">ID: 12345678</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="builder-column stuColumn-5">
                        <div className="stuDiv-14">Join</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>)
    }
    if(identity === "panellist"){
        return(
            <>
            <div className="panDiv">
              <div className="panDiv-2">
                <div className="panDiv-3">
                  <div className="builder-columns div-4">
                    <div className="builder-column panColumn">
                      <div className="div-5">
                        <div className="builder-columns div-6">
                          <div className="builder-column column-2">
                            <div className="div-7">ID: 12345678</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="builder-column panColumn-3">
                      <div className="div-8">Join</div>
                    </div>
                    <div className="builder-column panColumn-4">
                      <div className="panDiv-9">Edit</div>
                    </div>
                  </div>
                </div>
                <div className="panDiv-10">
                  <div className="builder-columns panDiv-11">
                    <div className="builder-column panColumn">
                      <div className="panDiv-12">
                        <div className="builder-columns panDiv-13">
                          <div className="builder-column panColumn-5">
                            <div className="panDiv-14">ID: 12345678</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="builder-column panColumn-6">
                      <div className="panDiv-15">Join</div>
                    </div>
                    <div className="builder-column panColumn-7">
                      <div className="panDiv-16">Edit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </>
        )
    }

}


export default MeetingList
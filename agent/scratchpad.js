function addScratchpadEntry(

    state,

    type,

    task,

    content

) {

    state.scratchpad.push({

        timestamp:
            new Date().toISOString(),

        type,

        task,

        content

    });

}

module.exports = {

    addScratchpadEntry

};
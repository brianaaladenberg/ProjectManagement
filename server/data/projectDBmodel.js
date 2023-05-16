import mongoose from 'mongoose';

const projectDBschema = mongoose.Schema({
    projectInfo: {
        projectNumber: Number,
        projectName: String,
        department: String,
        projectManager: String,
        projectArea: String
    },
    designInfo: {
        designer: String,
        hoursRemaining: Number,
        priority: Number,
        permitSubmital: Date,
        listDate: Date
    },
    fabInfo: {
        shipDate: Date,
        listNumber: Number,
        welds: Number,
        mains: Number,
        lines: Number,
        hangers: Number,
        sprinklers: Number,
        purchaseOrder: String,
        fieldPrints: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        building: String,
        area: String
    }
});

const projectDBmodel = mongoose.model('projectDBmodel', projectDBschema);

export default projectDBmodel;

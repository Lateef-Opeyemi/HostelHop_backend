import lanlord from "../models/hostel.model.js";

export async function hostel(req, res) {
    const body = req.body;

    if (!body) {
        return res.status(400).send({
            detail: "Request body is required"
        });
    }

    try {
        const {
            name,
            university,
            location,
            price,
            roomtype,
            description,
            images
        } = body;

        if (!images || images.length < 2 || images.length > 3) {
            return res.status(400).send({
                detail: "Please upload between 2 and 3 images"
            });
        }

        const hostel = await lanlord.create({
            name,
            university,
            location,
            price,
            roomtype,
            description,
            images,
            lanlordid: req.user._id
        });

        return res.status(201).send(hostel);

    } catch (e) {
        return res.status(500).send({
            detail: e.message
        });
    }
}


export async function getAllHostel(req, res) {
    try {
        const hostels = await lanlord.find().populate(
            "lanlordid",
            "name phonenumber"
        );

        return res.status(200).send(hostels);

    } catch (e) {
        return res.status(500).send({
            detail: e.message
        });
    }
}


export async function getMyHostels(req, res) {
    try {
        const hostels = await lanlord.find({
            lanlordid: req.user._id
        });

        return res.status(200).send({
            hostels
        });

    } catch (e) {
        return res.status(500).send({
            detail: e.message
        });
    }
}


export async function getSingleHostel(req, res) {
    const id = req.params.id;

    try {
        const hostel = await lanlord.findById(id);

        if (!hostel) {
            return res.status(404).send({
                detail: "Hostel not found"
            });
        }

        return res.status(200).send(hostel);

    } catch (e) {
        return res.status(500).send({
            detail: e.message
        });
    }
}


export async function updateHostel(req, res) {
    const { id } = req.params;

    try {
        const hostel = await lanlord.findOneAndUpdate(
            {
                _id: id,
                lanlordid: req.user._id
            },
            req.body,
            {
                new: true
            }
        );

        if (!hostel) {
            return res.status(404).send({
                detail: "Hostel not found or you do not own this hostel"
            });
        }

        return res.status(200).send(hostel);

    } catch (e) {
        return res.status(500).send({
            detail: e.message
        });
    }
}


export async function deleteHostel(req, res) {
    const { id } = req.params;

    try {
        const hostel = await lanlord.findOneAndDelete({
            _id: id,
            lanlordid: req.user._id
        });

        if (!hostel) {
            return res.status(404).send({
                detail: "Hostel not found or you do not own this hostel"
            });
        }

        return res.status(200).send({
            detail: "Hostel deleted successfully"
        });

    } catch (e) {
        return res.status(500).send({
            detail: e.message
        });
    }
}
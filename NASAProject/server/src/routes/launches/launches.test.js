import request from "supertest";
import { app } from "../../app";

describe("GET /launches", () => {
	test("get all launches", async () => {
		await request(app).get("/launches").expect("Content-Type", /json/).expect(200);
	});
});

describe("POST /launches", () => {
	const completeLaunchData = {
		mission: "Kepler Exploration 19-b",
		rocket: "Explorer IS010",
		launchDate: "December 27, 2030",
		destination: "Kepler-442 b",
	};

	const invalidLaunchDate = {
		mission: "Kepler Exploration 19-b",
		rocket: "Explorer IS010",
		launchDate: "xoo",
		destination: "Kepler-442 b",
	};
	const completeLaunchDataWithouDate = {
		mission: "Kepler Exploration 19-b",
		rocket: "Explorer IS010",
		destination: "Kepler-442 b",
	};
	test("test post launches data for 201 created", async () => {
		const response = await request(app)
			.post("/launches")
			.send(completeLaunchData)
			.expect("Content-Type", /json/)
			.expect(201);

		const responseLaunchDate = new Date(response.body.launchDate).valueOf();
		const passedLaunchDate = new Date(completeLaunchData.launchDate).valueOf();

		//here you need to seperate the launchDate because what you pass is the string format
		//and what you get is the converted date object format so you need to exclude it
		//from the rest of the response and test it seperately
		expect(responseLaunchDate).toBe(passedLaunchDate);
		expect(response.body).toMatchObject(completeLaunchDataWithouDate);
	});

	test("Missing required properties in POST /launches with 400", async () => {
		const response = await request(app)
			.post("/launches")
			.send(completeLaunchDataWithouDate)
			.expect("Content-Type", /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: "Please provide all the fields",
		});
	});

	test("Invalid Launch Date in POST /launches with 400", async () => {
		const response = await request(app)
			.post("/launches")
			.send(invalidLaunchDate)
			.expect("Content-Type", /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: "Invalid Launch date",
		});
	});
});

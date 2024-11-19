import { assert } from 'chai'
import request from 'supertest'

// sort of an system test
// I want to test app.js, so I import it
import app from "../app.js"

describe('Static Server', () => {
    it('should return index.html if it is requested', async () => {
        const res = await request(app).get("/index.html")

        assert.equal(res.statusCode, 200)

        assert.include(
            res.text,
            '<script src="javascripts/index.js" ></script>',
            "body doesn't have html code we recognize as from index.html"
        )
    })

    it('should return 404 for a non-existant file', async () => {
        const res = await request(app).get("/sadhfhelkhdsjsslkhkhdsf.html")

        assert.equal(res.statusCode, 404)
    })
})
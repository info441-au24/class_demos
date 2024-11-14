import { assert } from 'chai'
import request from 'supertest'

// sort of a integration test

// I want to test item.js, so I import it
// I don't think I can import item.js directly and still have it have the model info
import app from '../app.js'

describe('Items integration test (with database)', () => {
    it('should get items from the db for GET /items', async () => {
        const res = await request(app).get('/items')
        
        assert.equal(res.statusCode, 200)
        assert.equal(res.type, "application/json")

        assert.isArray(res.body)
        assert.include(res.body[0], {
            name: 'Orange',
            price: 1.5
        })
    })
})

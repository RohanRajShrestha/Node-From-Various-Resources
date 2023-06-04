Architecture we will be following
N - Layers
database
    - we will be using json file for that
src (to compile all the source code)
    - entitites (object mapping)
    - factories (popular for creating instances instance generators)
    - repositores (data access)
    - routes (endpoint mappings)
    - services (communications between the routes and repositories layer (business logix))
    - util (shared code)
    - handler (communication between routes and server)
    - index.js (server instance)
tests (all automated test suites)
    - integreation tests - testing on the user point of view, it's also E2E test because there's no app consuming it
    - unit test all test that must run without any externam connections such as databases, externaml APIs and on our case, the fileSystem


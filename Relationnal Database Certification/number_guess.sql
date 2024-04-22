--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    username character varying(22) NOT NULL,
    games_played integer,
    best_game integer
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES ('elo', NULL, NULL);
INSERT INTO public.users VALUES ('lo', NULL, NULL);
INSERT INTO public.users VALUES ('po', 0, NULL);
INSERT INTO public.users VALUES ('test', 0, NULL);
INSERT INTO public.users VALUES ('test2', 0, NULL);
INSERT INTO public.users VALUES ('*test3', 2, NULL);
INSERT INTO public.users VALUES ('user_1707991250889', 2, NULL);
INSERT INTO public.users VALUES ('user_1707991250890', 5, NULL);
INSERT INTO public.users VALUES ('eloise', 4, NULL);
INSERT INTO public.users VALUES ('user_1707992891423', 2, NULL);
INSERT INTO public.users VALUES ('user_1707992891424', 5, NULL);
INSERT INTO public.users VALUES ('user_1707992967644', 2, NULL);
INSERT INTO public.users VALUES ('user_1707992967645', 5, NULL);
INSERT INTO public.users VALUES ('user_1707992993126', 2, NULL);
INSERT INTO public.users VALUES ('user_1707992993127', 5, NULL);
INSERT INTO public.users VALUES ('testcount', 1, 1000);
INSERT INTO public.users VALUES ('testcount2', 2, 12);
INSERT INTO public.users VALUES ('user_1707993208677', 2, 332);
INSERT INTO public.users VALUES ('user_1707993208678', 5, 207);
INSERT INTO public.users VALUES ('user_1707993258551', 2, 463);
INSERT INTO public.users VALUES ('user_1707993258552', 5, 297);
INSERT INTO public.users VALUES ('user_1707993281199', 2, 214);
INSERT INTO public.users VALUES ('user_1707993281200', 5, 125);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--


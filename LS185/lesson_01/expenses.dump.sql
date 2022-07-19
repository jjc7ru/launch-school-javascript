--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

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
-- Name: expenses; Type: TABLE; Schema: public; Owner: jasonchoi
--

CREATE TABLE public.expenses (
    id integer NOT NULL,
    amount numeric(7,2) NOT NULL,
    memo text NOT NULL,
    created_on timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT expenses_amount_check CHECK ((amount > 0.01))
);


ALTER TABLE public.expenses OWNER TO jasonchoi;

--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: jasonchoi
--

ALTER TABLE public.expenses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.expenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: jasonchoi
--

COPY public.expenses (id, amount, memo, created_on) FROM stdin;
1	14.56	Pencils	2022-07-08 18:02:17.009833
2	3.29	Coffee	2022-07-08 18:02:30.437059
3	49.99	Text Editor	2022-07-08 18:02:43.22741
4	3.59	More Coffee	2022-07-08 19:56:31.488119
\.


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jasonchoi
--

SELECT pg_catalog.setval('public.expenses_id_seq', 4, true);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: jasonchoi
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

